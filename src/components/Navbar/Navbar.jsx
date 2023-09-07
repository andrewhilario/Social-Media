/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Flex,
  Image,
  LinkBox,
  transition
} from "@chakra-ui/react";
import React from "react";
import LogoFC from "../Logo/Logo";
import Notification from "../../assets/svg/Notification.svg";
import Message from "../../assets/svg/Chat Bubble.svg";
import Watch from "../../assets/svg/TVShowWhite.svg";
import { SearchBar } from "../SearchBar";
import Person1 from "../../assets/images/person-1.jpg";

function Navbar({ websiteName, paddingVertical }) {
  return (
    <>
      <Flex
        bg="#0C71F5"
        px={{
          base: "5px",
          md: "10px",
          lg: "20px"
        }}
        py={paddingVertical}
        alignItems={"center"}
      >
        <Flex w={"50%"} alignItems={"center"} gap={5}>
          <LogoFC websiteName={websiteName} />
          <LinkBox
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Image w={30} h={30} src={Notification} alt="notification" />
          </LinkBox>
          <LinkBox
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Image w={30} h={30} src={Message} alt="notification" />
          </LinkBox>
          <LinkBox
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Image w={30} h={30} src={Watch} alt="notification" />
          </LinkBox>
        </Flex>
        <Flex
          w={"50%"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={10}
        >
          <SearchBar searchBarWidth={"400px"} />
          <Avatar src={Person1} />
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
