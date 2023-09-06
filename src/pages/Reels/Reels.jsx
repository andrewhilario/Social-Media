import React from "react";
import Layout from "../Layout";
import ReelsVideo from "./components/ReelsVideo";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

function Reels() {
  return (
    <>
      <Helmet>
        <title>Reels | Paysbook</title>
      </Helmet>
      <Layout webName={"Paysbook Reels"} bgColor={"#222222"} paddingY={3}>
        <ReelsVideo />
        <Box bg={"#222222"} w={"100%"} h={"5vh"}></Box>
      </Layout>
    </>
  );
}

export default Reels;
