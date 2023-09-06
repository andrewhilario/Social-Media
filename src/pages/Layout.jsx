/* eslint-disable react/prop-types */
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Helmet } from "react-helmet";

function Layout({ children }) {
  return (
    <>
      <Box bg="#EDEDED" w={"100%"}>
        <Navbar />
        {children}
      </Box>
    </>
  );
}

export default Layout;
