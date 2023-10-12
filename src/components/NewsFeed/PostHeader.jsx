/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import React from "react";
import { BsGlobeAsiaAustralia } from "react-icons/bs";

import { HiDotsVertical } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";

function PostHeader(props) {
  return (
    <>
      <Flex alignItems={"center"}>
        <Flex w="100%">
          <Avatar src={props.profileSrc} />
          <Box>
            <Text ml={3} w="100%">
              {props.name}
            </Text>
            <Flex alignItems={"center"}>
              <Text ml={3} fontSize={12} w="100%">
                {props.dateTime ?? " Sept. 6, 2023, 4:00 PM"}
              </Text>
              {props.postVisibility === "Public" ? (
                <Flex
                  alignItems={"center"}
                  ml={3}
                  color={"gray.500"}
                  fontSize={12}
                >
                  <BsGlobeAsiaAustralia fontSize={14} />
                  <Text as={"span"} ml={1} fontSize={12}>
                    Public
                  </Text>
                </Flex>
              ) : (
                <Flex
                  alignItems={"center"}
                  ml={3}
                  color={"gray.500"}
                  fontSize={12}
                >
                  <IoLockClosed fontSize={14} />
                  <Text as={"span"} ml={1} fontSize={12}>
                    Public
                  </Text>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>
        <Menu direction={"rtl"}>
          <MenuButton
            as={Button}
            bg="none"
            px={2}
            _focus={{ bg: "none" }}
            _active={{ bg: "none" }}
          >
            <HiDotsVertical fontSize={24} />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem color={"red.500"}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

export default PostHeader;
