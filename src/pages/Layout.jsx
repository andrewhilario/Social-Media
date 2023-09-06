/* eslint-disable react/prop-types */
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Helmet } from "react-helmet";

function Layout({ children, webName, bgColor, paddingY }) {
  return (
    <>
      <Box bg={bgColor} w={"100%"}>
        <Navbar websiteName={webName} paddingVertical={paddingY} />
        {children}
      </Box>
    </>
  );
}

export default Layout;
