/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { HiDotsVertical } from "react-icons/hi";

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
            <Text ml={3} fontSize={12} w="100%">
              Sept. 6, 2023, 4:00 PM
            </Text>
          </Box>
        </Flex>
        <Button
          bg="none"
          px={2}
          _focus={{ bg: "none" }}
          _active={{ bg: "none" }}
        >
          <HiDotsVertical fontSize={24} />
        </Button>
      </Flex>
    </>
  );
}

export default PostHeader;
