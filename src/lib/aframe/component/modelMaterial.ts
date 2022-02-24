import * as AFRAME from "aframe";

export default function modelMaterial() {
    AFRAME.registerComponent("model-material", {
        schema: {
            opacity: { type: "number", default: 1 },
            transparent: { type: "boolean", default: true },
            needsUpdate: { type: "boolean", default: true },
        },
        init: function () {
            this.el.addEventListener("model-loaded", this.update.bind(this));
        },
        update: function () {
            var mesh = this.el.getObject3D("mesh");
            var data = this.data;
            console.log(this);
            if (!mesh) {
                return;
            }
            mesh.traverse(function (node) {
                if (node.isMesh) {
                    node.material.opacity = data.opacity;
                    node.material.transparent = data.transparent;
                    node.material.needsUpdate = data.needsUpdate;
                }
            });
        },
    });
}
