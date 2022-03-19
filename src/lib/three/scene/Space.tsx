import react from "react";
import { Canvas } from "@react-three/fiber";

const Space = (props) => {
    return (
        <>
            <Canvas>
                <ambientLight />
            </Canvas>
        </>
    );
};

export { Space };
