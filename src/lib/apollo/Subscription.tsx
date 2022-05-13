import { useSubscription } from "@apollo/client";
import { useLocation } from "wouter";
import { subMusicGql, subPlaceGql } from "./gql";
import { useSubscriptionStore } from "./useSubscriptionStore";

export const Subscription = () => {
    const [location, setLocation] = useLocation();

    const { data: subMusicData } = useSubscription(subMusicGql, {
        onSubscriptionData: ({ subscriptionData }) => {
            useSubscriptionStore
                .getState()
                .setMusic(subscriptionData.data["subMusic"]);
        },
    });

    const { data: subPlaceData } = useSubscription(subPlaceGql, {
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

    return <></>;
};
