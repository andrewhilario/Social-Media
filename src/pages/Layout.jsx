/* eslint-disable react/prop-types */
import React from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import { SmallScreenNav } from "../components/Navbar";

function Layout({ children, webName, bgColor, paddingY }) {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      <Box bg={bgColor} w={"100%"}>
        {isLargerThan1280 ? (
          <Navbar
            websiteName={webName ? webName : "Paysbook"}
            paddingVertical={paddingY ? paddingY : 5}
          />
        ) : (
          <SmallScreenNav websiteName={webName ? webName : "Paysbook"} />
        )}
        {children}
      </Box>
    </>
  );
}

export default Layout;
