import "aframe";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import Main from "./screen/Main";
import { ThemeProvider } from "@mui/material";
import { theme } from "./lib/muiTheme";

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Main />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
