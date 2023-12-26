/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Card,
  Flex,
  Image,
  Text,
  background
} from "@chakra-ui/react";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function StoryItem({ image, profileSrc, name, isLoggedIn }) {
  return (
    <Card
      w={"100%"}
      h={"250px"}
      borderRadius={"15px"}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover"
      }}
    >
      {isLoggedIn ? (
        <Box p={2}>
          <Avatar
            src={profileSrc}
            alt={profileSrc}
            name={name}
            border={"2px solid white"}
          />
        </Box>
      ) : null}

      <Flex
        w="100%"
        h={"40%"}
        bgGradient="linear(to-t, black, transparent)"
        mt="auto"
        borderRadius={"0 0 15px 15px"}
        alignItems={"center"}
        direction={"column"}
        justifyContent={"space-around"}
        py={2}
      >
        {isLoggedIn ? null : (
          <IoMdAddCircleOutline color={"white"} fontSize={32} />
        )}
        <Text color={"white"} textAlign={"center"} mt={"auto"}>
          {name}
        </Text>
      </Flex>
    </Card>
  );
}

export default StoryItem;
