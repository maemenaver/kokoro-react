import * as AFRAME from "aframe";
import React, { useEffect } from "react";
import modelMaterial from "./modelMaterial";
import pointComponent from "./point";
import renderOrder from "./renderOrder";

export default function RegisterComponent() {
    useEffect(() => {
        require("aframe-globe-component");
        renderOrder();
        modelMaterial();
        pointComponent();
    }, []);

    return <></>;
}
