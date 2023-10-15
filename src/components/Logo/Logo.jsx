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
          alignItems={{
            base: "flex-start",
            md: "center",
            lg: "center"
          }}
          mr={{
            base: 0,
            md: "24px"
          }}
          margin={props.margin ?? "0"}
          flexDirection={"column"}
        >
          <Text
            fontSize={{
              base: "5xl",
              lg: props.mainTextFontSize ?? "4xl"
            }}
            fontWeight={{
              base: "bold",
              lg: props.mainTextFontWeight ?? "bold"
            }}
            color={props.color ?? "white"}
          >
            {props.websiteName}
          </Text>
          <Text
            textAlign={"center"}
            color={props.subColor}
            fontSize={{
              base: "2xl",
              lg: props.subTextFontSize ?? "2xl"
            }}
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
