import { useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";
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
        fetchPolicy: "no-cache",
    });

    useSubscription(subMusicGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            useSubscriptionStore
                .getState()
                .setMusic(subscriptionData.data["subMusic"]);
            useSubscriptionStore.setState((state) => ({ musicReceived: true }));
        },
        shouldResubscribe: true,
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        setInterval(() => {
            const random = Math.floor(Math.random() * 3);
            let result = "space";
            switch (random) {
                case 0:
                    result = "space";
                    break;
                case 1:
                    result = "ether";
                    break;
                case 2:
                    result = "sea";
                    break;
            }

            useSubscriptionStore.getState().setPlace(result);
            setLocation(`/${result}`);
        }, 10000);
    }, []);

    // useSubscription(subPlaceGql, {
    //     onSubscriptionData: ({ subscriptionData }) => {
    //         const result: string = subscriptionData.data["subPlace"];
    //         useSubscriptionStore.getState().setPlace(result);

    //         if (
    //             location === "/ether" ||
    //             location === "/space" ||
    //             location === "/sea"
    //         )
    //             setLocation(`/${result}`);
    //     },
    //     shouldResubscribe: true,
    //     fetchPolicy: "no-cache",
    // });

    useSubscription(subShapeGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: string[] = subscriptionData.data["subShape"];
            useSubscriptionStore.setState((state) => ({ shape: result }));
        },
        shouldResubscribe: true,
        fetchPolicy: "no-cache",
    });

    useSubscription(subColorGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            const result: string[] = subscriptionData.data["subColor"];
            useSubscriptionStore.setState((state) => ({ color: result }));
        },
        shouldResubscribe: true,
        fetchPolicy: "no-cache",
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
        shouldResubscribe: true,
        fetchPolicy: "no-cache",
    });

    return null;
};
