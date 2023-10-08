import { Avatar, AvatarBadge, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { USERS } from "../../../constant/users";

function Chat() {
  return (
    <>
      <Flex justifyContent={"space-between"} align={"center"}>
        <Text fontWeight={"bold"} fontSize={24}>
          Chat
        </Text>
        <Text fontSize={14} color={"blue.600"}>
          Hide Chat
        </Text>
      </Flex>
      {USERS.map((user, index) => (
        <Flex
          key={index}
          py={4}
          px={2}
          borderRadius={10}
          cursor={"pointer"}
          align={"center"}
          _hover={{
            transition: "all .4s ease-in-out",
            bg: "gray.100"
          }}
        >
          <Avatar src={user.image}>
            <AvatarBadge size=".9em" bg="green.500" />
          </Avatar>
          <Text ml={3} fontSize={16} fontWeight={"bold"}>
            {user.name}
          </Text>
        </Flex>
      ))}
    </>
  );
}

export default Chat;
