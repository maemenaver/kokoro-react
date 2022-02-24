import * as AFRAME from "aframe";

export default function renderOrder() {
    AFRAME.registerComponent("render-order", {
        dependencies: ["material"],
        schema: {
            order: { type: "number", default: 0 },
        },
        init: function () {
            this.el.sceneEl.renderer.sortObjects = true;
            this.el.object3D.renderOrder = this.nextData.order;
            this.el.components.material.material.depthTest = false;
        },
    });
}
