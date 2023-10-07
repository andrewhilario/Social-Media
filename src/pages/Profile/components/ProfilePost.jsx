import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Post from "../../../components/NewsFeed/Post";
import CreatePost from "../../../components/NewsFeed/CreatePost";

function ProfilePost() {
  return (
    <Flex
      w={{
        base: "100%",
        md: "100%",
        lg: "90%"
      }}
      gap={5}
      direction={{
        base: "column",
        md: "column",
        lg: "row"
      }}
    >
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
      </Flex>
      <CreatePost
        height={{
          base: "210px",
          md: "230px",
          lg: "230px"
        }}
      />
    </Flex>
  );
}

export default ProfilePost;
