import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
    MIDIMessage,
    useMIDI,
    useMIDIMessage,
    useMIDINote,
    useMIDINotes,
} from "@react-midi/hooks";
import { useEffect, useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { getMusicPath, sendMusicGql, subMusicGql } from "../lib/apollo/gql";
import SoundfontProvider from "../lib/piano/SoundfontProvider";
import "react-piano/dist/styles.css";
import DimensionsProvider from "../lib/piano/DimensionsProvider";
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

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

interface MIDIMessageProps {
    input: any;
    setMessage: any;
}

const MIDIMessageProvider = (props: MIDIMessageProps) => {
    const message = useMIDIMessage(props.input);

    useEffect(() => {
        props.setMessage(message);
    }, [props.input, message, props.setMessage]);

    return <></>;
};

interface MusicProps {
    inputs: any[];
    musicType: string;
}

const Music = (props: MusicProps) => {
    const [data, setData] = useState<number[]>([]);
    const [inputID, setInputID] = useState<number>(0);
    const [message, setMessage] = useState<any>();
    const [result, setResult] = useState<any>();

    const [sendMusic] = useMutation(sendMusicGql);

    // useEffect(() => {
    //     if (message) {
    //         const _data = [...data, message.data[1]];
    //         setData(_data);
    //         console.log(_data);
    //     }
    // }, [message]);

    useEffect(() => {
        console.log(data);
        if (data.length === 50) {
            console.log(
                "악보가 완성되었다!",
                data.filter((_v, i) => i % 2 !== 0)
            );
            sendMusic({
                variables: {
                    notes: data,
                },
            });
        }
    }, [data]);

    useEffect(() => {
        if (data.length >= 50) {
            setResult(props.musicType);
        }
    }, [data, props.musicType]);

    return (
        <>
            {props.inputs.length > 0 && (
                <MIDIMessageProvider
                    setMessage={setMessage}
                    input={props.inputs[inputID]}
                />
            )}
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
                {data.length < 50 ? (
                    <>
                        <div
                            style={{
                                width: "90%",
                                marginBottom: 30,
                            }}
                        >
                            <DimensionsProvider>
                                {({ containerWidth, containerHeight }) => (
                                    <SoundfontProvider
                                        instrumentName="acoustic_grand_piano"
                                        audioContext={audioContext}
                                        hostname={soundfontHostname}
                                        data={data}
                                        setData={setData}
                                        message={message}
                                        render={({
                                            isLoading,
                                            playNote,
                                            stopNote,
                                            activeNotes,
                                        }) => (
                                            <Piano
                                                noteRange={noteRange}
                                                width={containerWidth}
                                                playNote={playNote}
                                                stopNote={stopNote}
                                                disabled={isLoading}
                                                activeNotes={activeNotes}
                                                keyboardShortcuts={
                                                    keyboardShortcuts
                                                }
                                            />
                                        )}
                                    />
                                )}
                            </DimensionsProvider>
                        </div>
                        <FormControl
                            fullWidth
                            style={{
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Select
                                id="demo-simple-select"
                                value={inputID}
                                onChange={(event) => {
                                    setInputID(+event.target.value);
                                }}
                                style={{
                                    color: "white",
                                    width: "30%",
                                    border: "1px solid #ced4da",
                                }}
                            >
                                {props.inputs.map((v, i) => {
                                    return (
                                        <MenuItem value={i} key={i}>
                                            {v.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </>
                ) : (
                    <>{result || <CircularProgress />}</>
                )}
            </div>
        </>
    );
};

export { Music };
