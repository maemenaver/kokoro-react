import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { baseURL } from "../config";
import axiosInstance from "../lib/axiosInstance";
import { UiFileInputButton } from "../components/primitive/UIFileInputButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import { useLocation } from "wouter";
import { useSubscriptionStore } from "../lib/apollo/useSubscriptionStore";
import { useMutation } from "@apollo/client";
import { setIsFellowGql } from "../lib/apollo/gql";

const Color = (props) => {
    const { router, status, content, image } = props;
    const [thumb, setThumb] = useState<string[]>(image ?? []);
    const [progress, setProgress] = useState<number>(0);

    const [, setLocation] = useLocation();
    const color = useSubscriptionStore((state) => state.color);

    const [setIsFellow] = useMutation(setIsFellowGql);

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
                <div>
                    <NavigateBefore
                        style={{
                            opacity: 0,
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
                        What's your Color?
                    </p>
                    <Formik initialValues={{}} onSubmit={(value, helper) => {}}>
                        {({ submitForm, isSubmitting }) => (
                            <Form
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <ImageList
                                    sx={{
                                        width: 240,
                                        height: 240,
                                        overflow: "hidden",
                                    }}
                                    cols={1}
                                >
                                    {thumb &&
                                        thumb.map((item: string, i: number) => {
                                            console.log("item", item);
                                            return (
                                                <ImageListItem key={item}>
                                                    <img
                                                        src={`${baseURL}/${item}`}
                                                        width={240}
                                                        height={240}
                                                    />
                                                </ImageListItem>
                                            );
                                        })}
                                </ImageList>
                                {thumb && thumb?.length > 0 ? (
                                    color.length > 0 ? (
                                        <div
                                            style={{
                                                fontSize: 24,
                                                letterSpacing: 3,
                                            }}
                                        >
                                            {color[0] === "주황"
                                                ? "🟠"
                                                : color[0] === "노랑"
                                                ? "🟡"
                                                : color[0] === "검정"
                                                ? "⚫️"
                                                : color[0] === "빨강"
                                                ? "🔴"
                                                : color[0] === "보라"
                                                ? "🟣"
                                                : color[0] === "초록"
                                                ? "🟢"
                                                : color[0] === "파랑"
                                                ? "🔵"
                                                : color[0] === "회색"
                                                ? "⚪️"
                                                : color[0]}
                                            {color[1] === "주황"
                                                ? "🟠"
                                                : color[1] === "노랑"
                                                ? "🟡"
                                                : color[1] === "검정"
                                                ? "⚫️"
                                                : color[1] === "빨강"
                                                ? "🔴"
                                                : color[1] === "보라"
                                                ? "🟣"
                                                : color[1] === "초록"
                                                ? "🟢"
                                                : color[1] === "파랑"
                                                ? "🔵"
                                                : color[1] === "회색"
                                                ? "⚪️"
                                                : color[1]}
                                            {color[2] === "주황"
                                                ? "🟠"
                                                : color[2] === "노랑"
                                                ? "🟡"
                                                : color[2] === "검정"
                                                ? "⚫️"
                                                : color[2] === "빨강"
                                                ? "🔴"
                                                : color[2] === "보라"
                                                ? "🟣"
                                                : color[2] === "초록"
                                                ? "🟢"
                                                : color[2] === "파랑"
                                                ? "🔵"
                                                : color[2] === "회색"
                                                ? "⚪️"
                                                : color[2]}
                                        </div>
                                    ) : (
                                        <CircularProgress />
                                    )
                                ) : (
                                    <UiFileInputButton
                                        label="Upload Files"
                                        // allowMultipleFiles 가 false 일경우, 하나씩만 올릴 수 있다.
                                        allowMultipleFiles={false}
                                        uploadFileName="files"
                                        onChange={onChange}
                                        thumb={thumb}
                                    />
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
                <div
                    onClick={() => {
                        setIsFellow({
                            variables: {
                                toggle: true,
                            },
                        });
                        setLocation("/fellow");
                    }}
                >
                    <NavigateNextIcon
                        style={{
                            fontSize: 60,
                            color: "#ffffff",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export { Color };
