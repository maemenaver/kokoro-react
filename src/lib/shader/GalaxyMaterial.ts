import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const galaxyFragmentShader = glsl`
    varying vec3 vColor;

    void main()
    {
        // // Disc
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength = step(0.5, strength);
        // strength = 1.0 - strength;

        // // Diffuse point
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength *= 2.0;
        // strength = 1.0 - strength;

        // Light point
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 10.0);

        // Final color
        vec3 color = mix(vec3(0.0), vColor, strength);
        gl_FragColor = vec4(color, 1.0);
}
`;

const galaxyVertexShader = glsl`
    uniform float uTime;
    uniform float uSize;

    attribute vec3 aRandomness;
    attribute float aScale;

    varying vec3 vColor;

    void main()
    {
        /**
         * Position
         */
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                    
        // Rotate
        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceToCenter = length(modelPosition.xz);
        float angleOffset = (1.0 / distanceToCenter) * uTime;
        angle += angleOffset;
        modelPosition.x = cos(angle) * distanceToCenter;
        modelPosition.z = sin(angle) * distanceToCenter;

        // Randomness
        modelPosition.xyz += aRandomness;

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        /**
         * Size
         */
        gl_PointSize = uSize * aScale;
        gl_PointSize *= (1.0 / - viewPosition.z);

        /**
         * Color
         */
        vColor = color;
    }
`;

export { galaxyFragmentShader, galaxyVertexShader };
