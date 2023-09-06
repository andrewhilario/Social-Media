import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import { Sidebar, SidebarRight } from "../../components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Layout from "../Layout";
import NewsFeed from "../../components/NewsFeed/NewsFeed";

function Homepage() {
  return (
    <>
      <Helmet>
        <title>Social Media App | Home</title>
      </Helmet>
      <Layout>
        <Grid templateColumns={"repeat(4, 1fr)"} gap={6}>
          <GridItem p={5}>
            <Sidebar />
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <NewsFeed />
          </GridItem>
          <GridItem p={5} w="100%">
            <SidebarRight />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
}

export default Homepage;
