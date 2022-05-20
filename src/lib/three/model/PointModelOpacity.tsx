import React, { useEffect } from "react";
import { useLocation } from "wouter";

interface PointModelOpacityProps {
    colorType: "therapeuticColor" | "primaryColor" | "secondaryColor";
    objName: string;
    opacityRef: any;
}

export const PointModelOpacity = (props: PointModelOpacityProps) => {
    const [location] = useLocation();

    useEffect(() => {
        if (props.colorType === "primaryColor" && props.opacityRef) {
            switch (location) {
                case "/space":
                    props.opacityRef.current =
                        props.objName === "spaceCenter" ? 1 : 0;
                    break;

                case "/ether":
                    props.opacityRef.current =
                        props.objName === "etherCenter" ? 1 : 0;
                    break;

                case "/sea":
                    props.opacityRef.current =
                        props.objName === "seaCenter" ? 1 : 0;
                    break;
            }
        }
    }, [location]);

    return null;
};
