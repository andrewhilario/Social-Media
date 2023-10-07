/* eslint-disable react/prop-types */
import React from "react";
import LogoFC from "../Logo/Logo";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function SmallScreenNav({ websiteName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        backgroundColor={"#0C71F5"}
        p={2}
        px={4}
        align={"center"}
        justify={"space-between"}
      >
        <LogoFC websiteName={websiteName} />
        <Flex
          gap={{
            base: 1,
            md: 2
          }}
        >
          <Flex
            w={{
              base: 9,
              md: 12
            }}
            h={{
              base: 9,
              md: 12
            }}
            borderRadius={"100%"}
            _hover={{
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out"
            }}
            align={"center"}
            justify={"center"}
          >
            <SearchIcon color={"white"} fontSize={24} />
          </Flex>
          <Flex
            w={{
              base: 9,
              md: 12
            }}
            h={{
              base: 9,
              md: 12
            }}
            borderRadius={"100%"}
            _hover={{
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out"
            }}
            align={"center"}
            justify={"center"}
            onClick={onOpen}
          >
            <HamburgerIcon color={"white"} fontSize={24} />
          </Flex>
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        closeOnEsc
        size={"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Hamburger Menu</DrawerHeader>
          <DrawerBody display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Link to="/reels">
              <Text>Reels</Text>
            </Link>
            <Link to="/profile">
              <Text>Profile</Text>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SmallScreenNav;
