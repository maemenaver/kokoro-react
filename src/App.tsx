import "aframe";
import * as THREE from "three";
import { ApolloProvider, useQuery } from "@apollo/client";
import { client } from "./lib/apollo";
import Main from "./screen/Main";

function App() {
    return (
        <ApolloProvider client={client}>
            <Main />
        </ApolloProvider>
    );
}

export default App;
