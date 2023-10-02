/* eslint-disable react/prop-types */
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/svg/Logo.svg";
import { Link } from "react-router-dom";

function LogoFC(props) {
  return (
    <>
      <Link to="/">
        <Flex
          alignItems={"center"}
          mr={{
            base: 0,
            md: "24px"
          }}
          margin={props.margin ?? "0"}
          flexDirection={"column"}
        >
          <Text
            fontSize={props.mainTextFontSize ?? "4xl"}
            fontWeight={props.mainTextFontWeight ?? "medium"}
            color={props.color ?? "white"}
          >
            {props.websiteName}
          </Text>
          <Text
            textAlign={"center"}
            color={props.subColor}
            fontSize={props.subTextFontSize ?? "md"}
            fontWeight={"medium"}
          >
            {props.subTitleWebsiteName ?? ""}
          </Text>
        </Flex>
      </Link>
    </>
  );
}

export default LogoFC;
