import * as AFRAME from "aframe";
import React, { useEffect } from "react";
import modelMaterial from "./modelMaterial";
import renderOrder from "./renderOrder";

export default function RegisterComponent() {
    useEffect(() => {
        renderOrder();
        modelMaterial();
    }, []);

    return <></>;
}
