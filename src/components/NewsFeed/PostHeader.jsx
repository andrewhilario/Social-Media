/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsGlobeAsiaAustralia } from "react-icons/bs";

import { HiDotsVertical } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { useAuth } from "../../context/AuthContext";

function PostHeader(props) {
  const { userOtherInfo } = useGetUserOtherInfo();
  const { user } = useAuth();

  return (
    <>
      <Flex
        alignItems={"center"}
        onClick={props.onPostClick}
        cursor={"pointer"}
      >
        <Flex w="100%">
          <Avatar name={props.name} src={props.profileSrc} />
          <Box>
            <Link
              href={`/profile/${props.postAuthorUid}`}
              color={"blue.500"}
              fontWeight={"semibold"}
              ml={3}
              w="100%"
            >
              {props.name}
            </Link>
            <Flex alignItems={"center"}>
              <Text m={0} ml={3} fontSize={12} w="100%">
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
                  <Text mb={0} as={"span"} ml={1} fontSize={12}>
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
                  <Text mb={0} as={"span"} ml={1} fontSize={12}>
                    Private
                  </Text>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>
        {user?.uid === props.uid && (
          <Menu>
            <MenuButton
              style={{
                marginLeft: "auto"
              }}
              // bg={"gray"}
              borderRadius="100%"
              _active={{ borderRadius: "100%" }}
              _focus={{ borderRadius: "100%" }}
              p={4}
            >
              <HiDotsVertical />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Post</MenuItem>
              <MenuItem>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </>
  );
}

export default PostHeader;
