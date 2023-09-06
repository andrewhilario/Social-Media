/* eslint-disable react/prop-types */
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/svg/Logo.svg";
import { Link } from "react-router-dom";

function LogoFC(props) {
  return (
    <>
      <Link to="/">
        <Flex alignItems={"center"} mr={"24"}>
          <Text fontSize={"4xl"} fontWeight={"medium"} color={"white"}>
            {props.websiteName}
          </Text>
        </Flex>
      </Link>
    </>
  );
}

export default LogoFC;
