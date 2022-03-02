import { AssetItem, Assets, Image } from "@belivvr/aframe-react";

export default function AframeAssets() {
    return (
        <>
            <Assets>
                <AssetItem
                    id="ground_grey"
                    src="models/ground_grey/ground_grey_1k.gltf"
                />
                <AssetItem
                    id="marble_bust_01"
                    src="models/marble_bust_01_2k/marble_bust_01_2k.gltf"
                />
                <AssetItem
                    id="vintage_pocket_watch"
                    src="models/vintage_pocket_watch_2k/vintage_pocket_watch_2k.gltf"
                />
                <AssetItem
                    id="Balloon_Cluster_v1"
                    src="models/Balloon_Cluster_v1/Balloon_Cluster_v1.gltf"
                />
                <Image id="smoke" src="textures/smoke.png" />
                <Image id="outCircle" src="textures/particles/2.png" />
            </Assets>
        </>
    );
}
