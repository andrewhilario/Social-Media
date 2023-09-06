import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/svg/Logo.svg";

function LogoFC() {
  return (
    <>
      <Flex alignItems={"center"} mr={"24"}>
        <Image src={Logo} alt="Logo" />
      </Flex>
    </>
  );
}

export default LogoFC;
