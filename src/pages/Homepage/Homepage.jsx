import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Helmet } from "react-helmet";
import { Sidebar, SidebarRight } from "../../components/Sidebar";
import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import Layout from "../Layout";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import SmallerScreen from "../SmallScreen/SmallerScreen";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HomepageLoader from "../../loaders/HomepageLoader";

function Homepage() {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const authListener = () => {
  //     if (!user) {
  //       navigate("/login");
  //     } else {
  //       navigate("/");
  //     }
  //   };
  //   authListener();
  // }, []);

  if (!user) {
    return <HomepageLoader />;
  } else {
    return (
      <>
        <Helmet>
          <title>Home | UM Connect</title>
          <meta name="title" content="UM Connect" />
          <meta
            name="description"
            content="Discover the future of financial empowerment with Paysbook. Join our community of smart earners, investors, and dreamers. Earn, save, and invest seamlessly while building a brighter tomorrow. Get started today!"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="UM Connect" />
          <meta
            property="og:description"
            content="Discover the future of financial empowerment with Paysbook. Join our community of smart earners, investors, and dreamers. Earn, save, and invest seamlessly while building a brighter tomorrow. Get started today!"
          />
          <meta property="og:site_name" content="UM Connect" />
        </Helmet>

        {isLargerThan1280 ? (
          <Layout webName="UM Connect" bgColor="#EDEDED" paddingY={5}>
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
        ) : (
          <SmallerScreen />
        )}
      </>
    );
  }
}

export default Homepage;
