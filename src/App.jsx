/* eslint-disable react/jsx-no-target-blank */

import "@fontsource/plus-jakarta-sans";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./routes/Router";
import theme from "./theme/theme";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
