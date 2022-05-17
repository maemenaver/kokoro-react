import { Button } from "@mui/material";
import { useSubscriptionStore } from "../lib/apollo/useSubscriptionStore";

const Intro = (props) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    zIndex: 1000,
                    color: "white",
                    fontSize: 60,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#0000005"
                }}
                onClick={(event) => {
                    useSubscriptionStore.setState((state) => ({
                        isStarted: true,
                    }));
                }}
            ></div>
        </>
    );
};

export { Intro };
