import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import { Sidebar } from "../../components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

function Homepage() {
  return (
    <>
      <Helmet>
        <title>Social Media App | Home</title>
      </Helmet>
      <Box bg="#EDEDED" w={"100%"} h={"100vh"}>
        <Navbar />
        <Grid templateColumns={"repeat(3, 1fr)"} gap={6}>
          <GridItem w="70%" p={5}>
            <Sidebar />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Homepage;
