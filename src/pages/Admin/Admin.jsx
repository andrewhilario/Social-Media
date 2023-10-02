import {
  Avatar,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";

import LogoFC from "../../components/Logo/Logo";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { MdOutlineAttachMoney } from "react-icons/md";
import Dashboard from "../../components/AdminComponents/Dashboard";
import Users from "../../components/AdminComponents/Users";

function Admin({ active }) {
  const [activeTab, setActiveTab] = React.useState(active);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Paysbook</title>
      </Helmet>
      <Tabs
        orientation="vertical"
        colorScheme="facebook"
        variant={"unstyled"}
        index={active}
      >
        <Flex
          flexDirection={"column"}
          backgroundColor={"#f5f5f5"}
          height={"100vh"}
          width={"16rem"}
        >
          <Box paddingTop={"2rem"} px={"2rem"}>
            <LogoFC
              websiteName={"Paysbook "}
              subTitleWebsiteName={"Admin Dashboard"}
              color={"blue.400"}
              subColor={"blue.500"}
              margin={"0 auto"}
            />
          </Box>
          <TabList alignItems={"start"} padding={"2rem"} gap={"2rem"}>
            <Tab
              // onClick={() => history}
              onClick={() => window.location.replace("/admin")}
              borderRadius={"10px"}
              _selected={{
                color: "white",
                bg: "blue.500",
                borderRadius: "10px"
              }}
              _focus={{ boxShadow: "none" }}
            >
              <LuLayoutDashboard
                style={{
                  fontSize: "1.5rem",
                  marginRight: "0.5rem"
                }}
              />
              Dashboard
            </Tab>
            <Tab
              onClick={() => window.location.replace("/admin/users")}
              borderRadius={"10px"}
              _selected={{
                color: "white",
                bg: "blue.500",
                borderRadius: "10px"
              }}
              _focus={{ boxShadow: "none" }}
            >
              <LuUsers style={{ fontSize: "1.5rem", marginRight: "0.5rem" }} />
              Users
            </Tab>
            <Tab
              borderRadius={"10px"}
              onClick={() => window.location.replace("/admin/earnings")}
              _selected={{
                color: "white",
                bg: "blue.500",
                borderRadius: "10px"
              }}
              _focus={{ boxShadow: "none" }}
            >
              <MdOutlineAttachMoney
                style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
              />
              Earnings
            </Tab>
          </TabList>
          <Flex mt={"auto"} align={"center"} gap={"1em"} width={24} height={24}>
            <Avatar ml={"1rem"} />
            <Text>User</Text>
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} width={"100%"}>
          <Box
            backgroundColor={"#fff"}
            height={"6rem"}
            width={"100%"}
            px={"2rem"}
            paddingRight={"4rem"}
            py={"1rem"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
          >
            <Text
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              color={"blue.500"}
              lineHeight={"1.5rem"}
            >
              Dashboard Overview
            </Text>
            <Flex alignItems={"center"} gap={"1rem"}>
              <Avatar />
              <Text>Admin</Text>
            </Flex>
          </Box>
          <TabPanels>
            <TabPanel
              style={{
                height: "calc(100vh - 6rem)",
                overflowY: "scroll",
                padding: "2rem"
              }}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px"
                }
              }}
            >
              <Dashboard />
            </TabPanel>
            <TabPanel
              style={{
                height: "calc(100vh - 6rem)",
                overflowY: "scroll",
                padding: "2rem"
              }}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px"
                }
              }}
            >
              <Users />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </>
  );
}

export default Admin;
