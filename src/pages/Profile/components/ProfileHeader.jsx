/* eslint-disable react/prop-types */
import { AddIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  background
} from "@chakra-ui/react";
import React from "react";
import coverPhoto from "../../../assets/images/cover-photo.jpg";
import ProfilePost from "./ProfilePost";

function ProfileHeader(props) {
  return (
    <>
      <Box w={"100%"} backgroundColor={"white"}>
        <Box
          backgroundImage={`url(${coverPhoto})`}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          w={"70%"}
          h={"550px"}
          mx={"auto"}
          borderRadius={"0 0 15px 15px"}
        ></Box>
        <Flex
          w={"70%"}
          mx={"auto"}
          justifyContent={"space-between"}
          py={4}
          position={"relative"}
        >
          <Flex>
            <Box
              position={"absolute"}
              top={"-70px"}
              left={"25px"}
              borderRadius={"full"}
              border={"5px solid #EDEDED"}
            >
              <Avatar src={props.profileImage} w={"150px"} h={"150px"} />
            </Box>
            <Flex marginLeft={"200px"} direction={"column"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {props.name}
              </Text>
              <Text fontSize={"md"} fontWeight={"medium"}>
                {props.friends} Friends
              </Text>
            </Flex>
          </Flex>
          <Flex gap={5}>
            <Button
              leftIcon={<AddIcon />}
              bg="#0C71F5"
              color={"white"}
              _hover={{
                bg: "#0C71F5"
              }}
            >
              Add Reels
            </Button>
            <Button
              leftIcon={<EditIcon />}
              bg="#0C71F5"
              color={"white"}
              _hover={{
                bg: "#0C71F5"
              }}
            >
              Edit Profile
            </Button>
            <Button
              bg="#0C71F5"
              color={"white"}
              _hover={{
                bg: "#0C71F5"
              }}
            >
              <ChevronDownIcon />
            </Button>
          </Flex>
        </Flex>
        <Divider variant="thick" w="70%" mx={"auto"} py={3} />
      </Box>
      <Tabs position="relative" variant="unstyled" w="100%" mx={"auto"} pt={5}>
        <Box background={"white"} w="100%" mx={"auto"}>
          <TabList w="70%" mx={"auto"}>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Posts</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>About</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Friends</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Photos</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Reels</Text>
            </Tab>
          </TabList>
        </Box>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels
          style={{
            width: "100%",
            background: "#EDEDED"
          }}
          mx={"auto"}
          marginTop={"25px"}
        >
          <Box w="70%" mx={"auto"}>
            <TabPanel>
              <ProfilePost />
            </TabPanel>
          </Box>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              <Text>About</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Friends</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Photos</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Reels</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ProfileHeader;
