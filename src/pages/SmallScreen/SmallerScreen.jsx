import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function SmallerScreen() {
  return (
    <Flex
      bg={"cyan.400"}
      w="100%"
      h="100vh"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text textAlign={"center"} fontSize={46} color={"white"}>
        Please open this page on a Laptop or PC
      </Text>
    </Flex>
  );
}

export default SmallerScreen;
