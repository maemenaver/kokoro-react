import { useQuery } from "@apollo/client";
import { useControls } from "leva";
import { useEffect } from "react";
import { getBoard, subBoard } from "../lib/apollo/gql";
import colorTranslate from "../lib/colorTranslate";
import { useColorStore } from "../lib/zustand/useColorStore";

export const ColorControl = () => {
    const {
        primaryColor,
        secondaryColor,
        therapeuticColor,
        transitionDelay,
        setPrimaryColor,
        setSecondaryColor,
        setTherapeuticColor,
        setTransitionDelay,
    } = useColorStore();

    const [, setColors] = useControls("colors", () => ({
        primaryColor: {
            value: primaryColor,
            onChange: (v) => {
                setPrimaryColor(v);
            },
        },
        secondaryColor: {
            value: secondaryColor,
            onChange: (v) => {
                setSecondaryColor(v);
            },
        },
        therapeuticColor: {
            value: therapeuticColor,
            onChange: (v) => {
                setTherapeuticColor(v);
            },
        },
        delay: {
            value: transitionDelay,
            onChange: (v) => {
                setTransitionDelay(v);
            },
        },
    }));

    // const board = useQuery(getBoard, {
    //     onCompleted: (data) => {
    //         console.log(data);
    //         const primary = "white";
    //         const secondary = "black";
    //         const therapeutic = "black";
    //         setColors({
    //             primaryColor: primary,
    //             secondaryColor: secondary,
    //             therapeuticColor: therapeutic,
    //         });

    //         setPrimaryColor(primary);
    //         setSecondaryColor(secondary);
    //         setTherapeuticColor(therapeutic);
    //     },
    // });

    useEffect(() => {
        setInterval(() => {
            const primary = colorTranslate(Math.floor(Math.random() * 8));
            const secondary = colorTranslate(Math.floor(Math.random() * 8));
            const therapeutic = colorTranslate(Math.floor(Math.random() * 8));

            console.log(primary, secondary, therapeutic);

            setColors({
                primaryColor: primary,
                secondaryColor: secondary,
                therapeuticColor: therapeutic,
            });
            setPrimaryColor(primary);
            setSecondaryColor(secondary);
            setTherapeuticColor(therapeutic);
        }, 10000);
    }, []);

    // useEffect(() => {
    //     const unsubBoard = board.subscribeToMore({
    //         document: subBoard,
    //         updateQuery: (prev, { subscriptionData }) => {
    //             if (!subscriptionData.data) return prev;
    //             console.log(subscriptionData);
    //             const primary = colorTranslate(
    //                 subscriptionData.data["subBoard"]["primaryColor"]
    //             );
    //             const secondary = colorTranslate(
    //                 subscriptionData.data["subBoard"]["secondaryColor"]
    //             );
    //             const therapeutic = colorTranslate(
    //                 subscriptionData.data["subBoard"]["therapeuticColor"]
    //             );
    //             setColors({
    //                 primaryColor: primary,
    //                 secondaryColor: secondary,
    //                 therapeuticColor: therapeutic,
    //             });
    //             setPrimaryColor(primary);
    //             setSecondaryColor(secondary);
    //             setTherapeuticColor(therapeutic);
    //         },
    //     });

    //     return () => {
    //         if (unsubBoard) unsubBoard();
    //     };
    // }, []);

    return null;
};
