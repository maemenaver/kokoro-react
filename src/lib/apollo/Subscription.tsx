import { useQuery, useSubscription } from "@apollo/client";
import { useLocation } from "wouter";
import { getMusicPath, subMusicGql, subPlaceGql, subShapeGql } from "./gql";
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

    return null;
};
