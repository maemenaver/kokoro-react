import { ImageList, ImageListItem } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { baseURL } from "../config";
import axiosInstance from "../lib/axiosInstance";
import { UiFileInputButton } from "../components/primitive/UIFileInputButton";

const Color = (props) => {
    const { router, status, content, image } = props;
    const [thumb, setThumb] = useState<string[]>(image ?? []);
    const [progress, setProgress] = useState<number>(0);
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
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "1",
                    color: "white",
                    fontSize: 60,
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
                                    border: "1px solid black",
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
                            <UiFileInputButton
                                label="Upload Files"
                                // allowMultipleFiles 가 false 일경우, 하나씩만 올릴 수 있다.
                                allowMultipleFiles={false}
                                uploadFileName="files"
                                onChange={onChange}
                                thumb={thumb}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export { Color };
