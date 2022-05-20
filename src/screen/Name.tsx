import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    ImageList,
    ImageListItem,
    MenuItem,
    Radio,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { TextField } from "formik-mui";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useLocation } from "wouter";
import { useSubscriptionStore } from "../lib/apollo/useSubscriptionStore";
import axios from "axios";
import { baseURL } from "../config";

const Name = (props) => {
    const { router, status, content, image } = props;
    const [thumb, setThumb] = useState<string[]>(image ?? []);
    const [progress, setProgress] = useState<number>(0);

    const [, setLocation] = useLocation();

    useEffect(() => {
        useSubscriptionStore.setState({ isStarted: false });
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyItems: "center",
                    width: "100%",
                    height: "90%",
                }}
            >
                <div
                    onClick={() => {
                        setLocation("/color");
                    }}
                >
                    <NavigateBefore
                        style={{
                            fontSize: 60,
                            color: "#000000",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: "1",
                        color: "white",
                        fontSize: 60,
                        flex: 1,
                    }}
                >
                    <p
                        style={{
                            fontFamily: "LetterGothicMTStd",
                            fontSize: 32,
                        }}
                    >
                        What's your Name?
                    </p>
                    <Formik
                        initialValues={{ outlined: "" }}
                        onSubmit={(value, helper) => {
                            if (value.outlined !== "") {
                                axios
                                    .post(`${baseURL}/api/board/create`, {
                                        author: value.outlined,
                                    })
                                    .then(() => {
                                        setLocation("/emote");
                                    });
                            } else {
                                setLocation("/emote");
                            }
                        }}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress />
                                ) : (
                                    <>
                                        <Field
                                            component={TextField}
                                            // label="Outlined"
                                            name="outlined"
                                            variant="outlined"
                                            // InputProps={{ notched: true }}
                                            style={{
                                                color: "#ffffff",
                                            }}
                                        />
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={submitForm}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            ⭐️
                                        </Button>
                                    </>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
                <div
                    onClick={() => {
                        setLocation("/music");
                    }}
                >
                    <NavigateNextIcon
                        style={{
                            fontSize: 60,
                            color: "#000000",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export { Name };
