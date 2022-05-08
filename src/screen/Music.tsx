import { useMutation, useQuery } from "@apollo/client";
import {
    useMIDI,
    useMIDIMessage,
    useMIDINote,
    useMIDINotes,
} from "@react-midi/hooks";
import { useEffect, useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { getMusicPath, sendMusicGql } from "../lib/apollo/gql";
import SoundfontProvider from "../lib/piano/SoundfontProvider";
import "react-piano/dist/styles.css";
import DimensionsProvider from "../lib/piano/DimensionsProvider";

// webkitAudioContext fallback needed to support Safari
// @ts-ignore
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("b7"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

interface MusicProps {
    input: any;
}

const Music = (props: MusicProps) => {
    const [data, setData] = useState<number[]>([]);

    const message = useMIDIMessage(props.input);

    const musicPath = useQuery(getMusicPath, {
        onCompleted: (data) => {
            console.log(data);
            const result = JSON.parse(data.getMusicPath);
            console.log(result);
        },
    });

    const [sendMusic] = useMutation(sendMusicGql);

    useEffect(() => {
        if (message) {
            const _data = [...data, message.data[1]];
            setData(_data);
            console.log(_data);
        }
    }, [message]);

    useEffect(() => {
        if (data.length === 50) {
            console.log(
                "악보가 완성되었다!",
                data.filter((_v, i) => i % 2 !== 0)
            );
            sendMusic();
        }
    }, [data]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "1",
                    color: "white",
                    width: "100%",
                    height: "90%",
                }}
            >
                <p
                    style={{
                        fontFamily: "LetterGothicMTStd",
                        fontSize: 32,
                    }}
                >
                    What's your Music?
                </p>
                <div
                    style={{
                        width: "90%",
                    }}
                >
                    <DimensionsProvider>
                        {({ containerWidth, containerHeight }) => (
                            <SoundfontProvider
                                instrumentName="acoustic_grand_piano"
                                audioContext={audioContext}
                                hostname={soundfontHostname}
                                render={({ isLoading, playNote, stopNote }) => (
                                    <Piano
                                        noteRange={noteRange}
                                        width={containerWidth}
                                        playNote={playNote}
                                        stopNote={stopNote}
                                        disabled={isLoading}
                                        keyboardShortcuts={keyboardShortcuts}
                                    />
                                )}
                            />
                        )}
                    </DimensionsProvider>
                </div>
            </div>
        </>
    );
};

export { Music };
