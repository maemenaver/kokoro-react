import * as AFRAME from "aframe";

export default function pointComponent() {
    /**
     * Point component for A-Frame.
     */
    AFRAME.registerComponent("point", {
        /**
         * Set if component needs multiple instancing.
         */
        multiple: false,

        /**
         * Called once when component is attached. Generally for initial setup.
         */
        init: function () {
            const { THREE } = AFRAME;
            this.tick = this.tick.bind(this);

            const textureLoader = new THREE.TextureLoader();
            const particleTexture = textureLoader.load(
                "/textures/particles/2.png"
            );

            // Create geometry.
            const geometry = new THREE.BufferGeometry();

            const count = 2000;
            const positions = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 40;
            }

            geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );

            // Create material.
            this.material = new THREE.PointsMaterial({
                color: "#ffffff",
                size: 0.1,
                sizeAttenuation: true,
                transparent: true,
                alphaMap: particleTexture,
                depthWrite: false,
            });

            // Create mesh.
            this.geometry = geometry;
            this.points = new THREE.Points(this.geometry, this.material);

            // Set mesh on entity.
            this.el.setObject3D("mesh", this.points);
        },

        /**
         * Called when a component is removed (e.g., via removeAttribute).
         * Generally undoes all modifications to the entity.
         */
        remove: function () {
            this.el.removeObject3D("mesh");
        },

        tick: function (time, timeDelta) {
            const count = 2000;
            const geometry = this.el.object3D.children[0].geometry;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                geometry.attributes.position.array[i3 + 1] +=
                    timeDelta * 0.0003;

                if (geometry.attributes.position.array[i3 + 1] > 20) {
                    geometry.attributes.position.array[i3 + 1] = -20;
                }
            }
            geometry.attributes.position.needsUpdate = true;
        },
    });
}
