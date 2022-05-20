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
import { useCallback, useState } from "react";
import { TextField } from "formik-mui";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useLocation } from "wouter";

const Emote = (props) => {
    const { router, status, content, image } = props;
    const [thumb, setThumb] = useState<string[]>(image ?? []);
    const [progress, setProgress] = useState<number>(0);

    const [, setLocation] = useLocation();

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
                        What's your Condition?
                    </p>
                    <Formik
                        initialValues={{
                            condition: "",
                        }}
                        onSubmit={(value, helper) => {
                            setLocation("/color");
                        }}
                    >
                        {({ submitForm, isSubmitting, setValues }) => (
                            <Form
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress />
                                ) : (
                                    <>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setValues({
                                                    condition: "happy",
                                                });
                                                submitForm();
                                            }}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            😄
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setValues({
                                                    condition: "romance",
                                                });
                                                submitForm();
                                            }}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            😞
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setValues({
                                                    condition: "angry",
                                                });
                                                submitForm();
                                            }}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            😡
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setValues({
                                                    condition: "calm",
                                                });
                                                submitForm();
                                            }}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            😑
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setValues({
                                                    condition: "sad",
                                                });
                                                submitForm();
                                            }}
                                            style={{
                                                marginTop: 16,
                                            }}
                                        >
                                            😭
                                        </Button>
                                    </>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
                <div
                    onClick={() => {
                        // setLocation("/music");
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

export { Emote };
