import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Post from "../../../components/NewsFeed/Post";
import CreatePost from "../../../components/NewsFeed/CreatePost";

function ProfilePost() {
  return (
    <Flex gap={5}>
      <Flex
        direction={"column"}
        backgroundColor={"white"}
        borderRadius={15}
        p={4}
        my={3}
      >
        <Text fontWeight={"semibold"} letterSpacing={1} fontSize={"2xl"} mb={5}>
          Bio
        </Text>
        <Box mb={10}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </Text>
        </Box>
        <Button>Edit Bio</Button>
      </Flex>
      <CreatePost height={"200px"} />
    </Flex>
  );
}

export default ProfilePost;
