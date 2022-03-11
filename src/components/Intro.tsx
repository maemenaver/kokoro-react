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
                    zIndex: "1",
                    color: "white",
                    fontSize: 60,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#0000005"
                }}
            >
                <p>Your Space</p>
                <a href="/space">Start</a>
            </div>
        </>
    );
};

export { Intro };
