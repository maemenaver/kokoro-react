import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    // status: {
    //     danger: "#e53e3e",
    // },
    palette: {
        primary: {
            main: "#ffffff",
            // darker: "#053e85",
        },
        mode: "dark",

        // neutral: {
        //     main: "#64748B",
        //     contrastText: "#fff",
        // },
    },
});

export { theme };
