import AframeScene from "./AframeScene";
import RegisterComponent from "./component";
import ColorizeSea from "./shader/ColorizeSea";
import ColorizeSky from "./shader/ColorizeSky";

export default function AframeProvider({ children }) {
    return (
        <>
            <RegisterComponent />

            {/* Shaders */}
            <ColorizeSky />
            <ColorizeSea />

            <AframeScene>{children}</AframeScene>
        </>
    );
}
