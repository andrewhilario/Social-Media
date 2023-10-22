import React from "react";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";

function Event() {
  return (
    <>
      <Flex justifyContent={"space-between"} align={"center"}>
        <Text m={0} fontWeight={"bold"} fontSize={24}>
          Events
        </Text>
        <Text m={0} fontSize={14} color={"blue.600"}>
          See all
        </Text>
      </Flex>
      <Flex py={4} gap={4}>
        <Card>
          <Text m={0} fontSize={24} fontWeight={"bold"} px={8} py={4}>
            20
          </Text>
          <Text
            m={0}
            fontSize={16}
            fontWeight={"medium"}
            bgColor={"#0C71F5"}
            borderRadius={"0 0 5px 5px"}
            textAlign={"center"}
            color={"white"}
            py={2}
            px={4}
          >
            Sept
          </Text>
        </Card>
        <Flex direction={"column"} gap={1}>
          <Text m={0} fontWeight={"bold"} fontSize={20}>
            Social Media
          </Text>
          <Flex align={"center"}>
            <IoLocationSharp />
            <Text m={0} ml={1}>
              Tandang Balara
            </Text>
          </Flex>
          <Text
            m={0}
            fontSize={14}
            color={"blue.600"}
            _hover={{
              transition: "all .4s ease-in-out",
              textDecoration: "underline"
            }}
          >
            More info
          </Text>
        </Flex>
      </Flex>
      <Flex py={4} gap={4}>
        <Card>
          <Text m={0} fontSize={24} fontWeight={"bold"} px={8} py={4}>
            28
          </Text>
          <Text
            m={0}
            fontSize={16}
            fontWeight={"medium"}
            bgColor={"#0C71F5"}
            borderRadius={"0 0 5px 5px"}
            textAlign={"center"}
            color={"white"}
            py={2}
            px={4}
          >
            Oct
          </Text>
        </Card>
        <Flex direction={"column"} gap={1}>
          <Text m={0} fontWeight={"bold"} fontSize={20}>
            Seminar
          </Text>
          <Flex align={"center"}>
            <IoLocationSharp />
            <Text m={0} ml={1}>
              Tandang Balara
            </Text>
          </Flex>
          <Text
            m={0}
            fontSize={14}
            color={"blue.600"}
            _hover={{
              transition: "all .4s ease-in-out",
              textDecoration: "underline"
            }}
          >
            More info
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Event;
