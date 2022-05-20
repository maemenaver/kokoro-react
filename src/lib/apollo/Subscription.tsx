import { useQuery, useSubscription } from "@apollo/client";
import { useLocation } from "wouter";
import {
    getMusicPath,
    subColorGql,
    subMusicGql,
    subPlaceGql,
    subShapeGql,
    subStartGql,
} from "./gql";
import { useSubscriptionStore } from "./useSubscriptionStore";

export const Subscription = () => {
    const [location, setLocation] = useLocation();

    useQuery(getMusicPath, {
        onCompleted: (data) => {
            const result = JSON.parse(data.getMusicPath);
            useSubscriptionStore.setState((state) => ({
                musicPath: result,
            }));
        },
    });

    useSubscription(subMusicGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            useSubscriptionStore
                .getState()
                .setMusic(subscriptionData.data["subMusic"]);
            useSubscriptionStore.setState((state) => ({ musicReceived: true }));
        },
    });

    useSubscription(subPlaceGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: string = subscriptionData.data["subPlace"];
            useSubscriptionStore.getState().setPlace(result);

            if (
                location === "/ether" ||
                location === "/space" ||
                location === "/sea"
            )
                setLocation(`/${result}`);
        },
    });

    useSubscription(subShapeGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: string[] = subscriptionData.data["subShape"];
            useSubscriptionStore.setState((state) => ({ shape: result }));
        },
    });

    useSubscription(subColorGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: string[] = subscriptionData.data["subColor"];
            useSubscriptionStore.setState((state) => ({ color: result }));
        },
    });

    useSubscription(subStartGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: boolean = subscriptionData.data["subStart"];

            if (result) {
                if (
                    location === "/space" ||
                    location === "/ether" ||
                    location === "/sea"
                ) {
                    useSubscriptionStore.setState((state) => ({
                        isStarted: true,
                    }));
                }
            } else {
                if (
                    location === "/space" ||
                    location === "/ether" ||
                    location === "/sea"
                ) {
                    setLocation("/space");
                } else {
                    setLocation("/");
                }

                window.location.reload();
            }
        },
    });

    return null;
};
