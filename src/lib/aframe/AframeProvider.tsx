import ColorizeSky from "./shader/ColorizeSky";

export default function AframeProvider({ children }) {
    return (
        <>
            <ColorizeSky />
            {children}
        </>
    );
}
