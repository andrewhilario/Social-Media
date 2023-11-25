import React from "react";
import Layout from "../Layout";
import ReelsVideo from "./components/ReelsVideo";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ReelsVideoSM from "./components/ReelsVideoSM";

function Reels() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      <Helmet>
        <title>Reels | UMConnect</title>
      </Helmet>
      {isLargerThan1280 ? (
        <Layout webName={"UMConnect Reels"} bgColor={"#222222"} paddingY={3}>
          <>
            <ReelsVideo />
            <Box bg={"#222222"} w={"100%"} h={"5vh"}></Box>
          </>
        </Layout>
      ) : (
        <ReelsVideoSM />
      )}
    </>
  );
}

export default Reels;
