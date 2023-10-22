import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import AdvertisementImg from "../../../assets/images/advertisement-1.jpg";

function Advertisement() {
  return (
    <>
      <Flex justifyContent={"space-between"} align={"center"}>
        <Text m={0} fontWeight={"bold"} fontSize={24}>
          Advertisement
        </Text>
        <Text m={0} fontSize={14} color={"blue.600"}>
          Close
        </Text>
      </Flex>
      <Box py={4}>
        <Image borderRadius={10} src={AdvertisementImg} />
      </Box>
    </>
  );
}

export default Advertisement;
