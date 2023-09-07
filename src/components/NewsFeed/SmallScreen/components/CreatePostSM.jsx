import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "../../../SearchBar";
import { LuImage } from "react-icons/lu";
import Person1 from "../../../../assets/images/person-1.jpg";

function CreatePostSM() {
  return (
    <Flex align={"center"} px={2} py={1} gap={3}>
      <Avatar src={Person1} size={"sm"} />
      <Box w={"100%"}>
        <Input placeholder={"What's on your mind?"} ml={2} borderRadius={20} />
      </Box>
      <Flex direction={"column"} align={"center"}>
        <LuImage />
        <Text fontSize={12} fontWeight={"regular"}>
          Photo
        </Text>
      </Flex>
    </Flex>
  );
}

export default CreatePostSM;
