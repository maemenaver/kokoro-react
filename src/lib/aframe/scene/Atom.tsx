import { Entity, Light, Mixin, Sky, Sphere } from "@belivvr/aframe-react";
import React, { useEffect } from "react";

const Atom = (props) => {
    return (
        <>
            <Sky src={"textures/crab_nebula.png"} />
            <Light type="ambient" intensity={0.5} />
        </>
    );
};

export { Atom };
