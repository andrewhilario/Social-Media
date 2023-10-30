/* eslint-disable react/prop-types */
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function ChatBubble({ onClose, setOnClose }) {
  const [minimize, setMinimize] = useState("400px");

  const handleMinimize = () => {
    if (minimize === "400px") {
      setMinimize("60px");
    } else {
      setMinimize("400px");
    }
  };

  return (
    <Box
      position={"fixed"}
      bottom={"0%"}
      right={"1.5%"}
      bg={"#fff"}
      shadow={"lg"}
      w={"400px"}
      h={minimize}
      zIndex={2}
      borderTopRadius={"10px"}
      display={onClose ? "none" : minimize ? "flex" : "flex"}
      flexDirection={"column"}
      style={{
        transition: "all 0.3s ease-in-out"
      }}
    >
      {/* Header chat */}
      <Flex
        align={"center"}
        gap={2}
        justify={"space-between"}
        bg={"blue.500"}
        borderTopRadius={"10px"}
        px={"10px"}
        py={"10px"}
      >
        <Flex align={"center"} gap={2}>
          <Avatar name="Dan Abrahmov" src="" size={"sm"} />
          <Text m={0} fontSize={16} fontWeight={"medium"} color={"#fff"}>
            Dan Abrahmov
          </Text>
        </Flex>
        <Flex align={"center"} gap={2}>
          <Button
            bg={"transparent"}
            _hover={{
              bg: "blue.600"
            }}
            p={0}
            color={"#fff"}
            onClick={handleMinimize}
          >
            -
          </Button>
          <Button
            bg={"transparent"}
            p={0}
            color={"#fff"}
            _hover={{
              bg: "blue.600"
            }}
            onClick={() => {
              setOnClose(!onClose);
            }}
          >
            <SmallCloseIcon color={"#fff"} />
          </Button>
        </Flex>
      </Flex>

      {/* Body chat */}
      <Flex
        direction={"column"}
        overflowY={"auto"}
        px={"10px"}
        py={"10px"}
        gap={2}
        flex={1}
      >
        <Flex
          direction={"column"}
          alignSelf={"flex-start"}
          w={"fit-content"}
          mt={"auto"}
        >
          <Flex align={"center"} gap={2}>
            <Avatar bg={"teal.400"} src="" size={"xs"} color={"#fff"} />
            <Text
              bg={"#ededed"}
              px={"10px"}
              py={"5px"}
              m={0}
              fontSize={14}
              fontWeight={"medium"}
              borderRadius={"10px"}
            >
              Hello
            </Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} alignSelf={"flex-end"} w={"fit-content"}>
          <Flex align={"center"} gap={2}>
            <Text
              bg={"#ededed"}
              px={"10px"}
              py={"5px"}
              m={0}
              fontSize={14}
              fontWeight={"medium"}
              borderRadius={"10px"}
            >
              Hello, How are you?
            </Text>
            <Avatar name="Dan Abrahmov" src="" size={"xs"} />
          </Flex>
        </Flex>
      </Flex>

      {/* Footer chat */}
      <Flex
        align={"center"}
        justify={"space-between"}
        borderBottomRadius={"10px"}
        px={"10px"}
        py={"10px"}
        mt={"auto"}
        gap={2}
      >
        <Input
          placeholder="Type a message"
          bg={"#fff"}
          borderRadius={"10px"}
          px={"10px"}
          py={"10px"}
          w={"100%"}
          _focus={{
            outline: "none"
          }}
        />
        <Button
          bg={"transparent"}
          p={0}
          _hover={{
            bg: "#e0e0e0"
          }}
        >
          <IoSend color={"#7b7b7b"} />
        </Button>
      </Flex>
    </Box>
  );
}

export default ChatBubble;
