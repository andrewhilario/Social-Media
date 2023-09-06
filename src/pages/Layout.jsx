import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Layout(children) {
  return (
    <Box>
      <Text>Layout</Text>
      {children}
    </Box>
  );
}

export default Layout;
