import * as AFRAME from "aframe";

export default function modelMaterial() {
    AFRAME.registerComponent("model-material-opacity", {
        schema: { type: "number", default: 1 },
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
                    node.material.opacity = data;
                    node.material.transparent = data < 1.0;
                    node.material.needsUpdate = true;
                }
            });
        },
    });
}
