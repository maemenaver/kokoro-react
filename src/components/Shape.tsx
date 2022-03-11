const Shape = (props) => {
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
                <p>당신의 모양은 무엇입니까?</p>
                <p>기다리는 중...</p>
            </div>
        </>
    );
};

export { Shape };
