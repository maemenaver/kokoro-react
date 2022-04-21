import { useMutation, useQuery } from "@apollo/client";
import {
    useMIDI,
    useMIDIMessage,
    useMIDINote,
    useMIDINotes,
} from "@react-midi/hooks";
import { useEffect, useState } from "react";
import { getMusicPath, sendMusicGql } from "../lib/apollo/gql";

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
                    position: "fixed",
                    zIndex: "1",
                    color: "white",
                    fontSize: 60,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#0000005"
                }}
            >
                <p>당신의 음악은 무엇입니까?</p>
                <p>기다리는 중...</p>
            </div>
        </>
    );
};

export { Music };
