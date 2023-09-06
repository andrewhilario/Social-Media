import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/svg/Logo.svg";
import { Link } from "react-router-dom";

function LogoFC() {
  return (
    <>
      <Link to="/">
        <Flex alignItems={"center"} mr={"24"}>
          <Text fontSize={"4xl"} fontWeight={"medium"} color={"white"}>
            Paysbook
          </Text>
        </Flex>
      </Link>
    </>
  );
}

export default LogoFC;
