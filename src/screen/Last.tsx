import { Field, Form, Formik } from "formik";
import { useCallback, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useLocation } from "wouter";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@apollo/client";
import { setStartGql } from "../lib/apollo/gql";

const Last = (props) => {
    const { router, status, content, image } = props;
    const [thumb, setThumb] = useState<string[]>(image ?? []);
    const [progress, setProgress] = useState<number>(0);

    const [, setLocation] = useLocation();
    const [setStart] = useMutation(setStartGql);

    const onChange = useCallback(
        async (formData: FormData) => {
            const config = {
                headers: { "content-type": "multipart/form-data" },
                onUploadProgress: (event: {
                    loaded: number;
                    total: number;
                }) => {
                    setProgress(Math.round((event.loaded * 100) / event.total));
                },
            };

            axiosInstance()
                .post<any>("/api/board/upload-images", formData, config)
                .then((res) => {
                    const tmpThumb = [...res.data.files.map((v) => v.filename)];

                    setThumb(tmpThumb);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [thumb]
    );

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
                        setLocation("/music");
                    }}
                >
                    <NavigateBefore
                        style={{
                            fontSize: 60,
                            color: "#ffffff",
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
                        How was it?
                    </p>
                    <Formik
                        initialValues={{}}
                        onSubmit={(value, helper) => {
                            window.open(
                                "https://docs.google.com/forms/d/183zIoVqFCUFND5whxPY2OtjQupJLm7zvCcrncuNAw78/viewform?edit_requested=true",
                                "_blank"
                            );
                            setStart({
                                variables: {
                                    start: false,
                                },
                            });
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
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={submitForm}
                                    >
                                        💌
                                    </Button>
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
                            opacity: 0,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export { Last };
