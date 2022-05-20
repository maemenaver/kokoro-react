import * as THREE from "three";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useSubscriptionStore } from "../../apollo/useSubscriptionStore";
import shallow from "zustand/shallow";
import { PositionalAudio } from "@react-three/drei";
import { baseURL } from "../../../config";

export const AudioBackground = () => {
    const [selectedMusic, setSelectedMusic] = useState<string>();

    const audioRef = useRef<THREE.PositionalAudio>();

    const { music, path, isStarted } = useSubscriptionStore(
        (state) => ({
            music: state.music,
            path: state.musicPath,
            isStarted: state.isStarted,
        }),
        shallow
    );

    const selectMusic = useCallback(() => {
        if (music) {
            console.log(music, path);

            let dir = path.children.find((v) => v.name === music);
            if (path) {
                dir = dir.children.filter((v) => v.name !== ".DS_Store");
            }

            console.log(dir);
            const selectedIndex = Math.floor(dir.length * Math.random());
            console.log(dir[selectedIndex].name);
            setSelectedMusic(encodeURIComponent(dir[selectedIndex].name));
        }
    }, [music, path, selectedMusic]);

    useEffect(() => {
        selectMusic();
    }, [music, path, isStarted]);

    useEffect(() => {
        if (music) {
            console.log(`${baseURL}/scrapes/${music}/${selectedMusic}`);
            if (isStarted) {
                const audioLoader = new THREE.AudioLoader();
                audioLoader.load(
                    `${baseURL}/scrapes/${music}/${selectedMusic}`,
                    (buffer) => {
                        if (audioRef.current.isPlaying) {
                            audioRef.current.stop();
                        }
                        audioRef.current.setVolume(0);
                        audioRef.current.setBuffer(buffer);
                        audioRef.current.setVolume(1);
                        audioRef.current.play();
                    }
                );
            }
        }
    }, [selectedMusic, isStarted]);

    return (
        <group>
            {music && isStarted && selectedMusic && (
                <PositionalAudio
                    url={`${baseURL}/scrapes/Happy/Allegro.mp3`}
                    ref={audioRef}
                    onEnded={selectMusic}
                    autoplay
                    loop={false}
                />
            )}
        </group>
    );
};
