/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import Logo from "../../assets/svg/Logo.svg";
import { Link } from "react-router-dom";

function LogoFC(props) {
  const mediaQuery = useMediaQuery("(max-width: 300px");

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
          margin={props.margin ? props.margin : "0"}
          flexDirection={"column"}
        >
          <Text
            fontSize={{
              base: mediaQuery ? "1rem" : "1.5rem",
              lg: props.mainTextFontSize ?? "4xl"
            }}
            fontWeight={{
              base: "bold",
              lg: props.mainTextFontWeight ?? "bold"
            }}
            color={props.color ?? "white"}
            m={0}
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
            display={props.subTitleWebsiteName ? "block" : "none"}
          >
            {props.subTitleWebsiteName ?? null}
          </Text>
        </Flex>
      </Link>
    </>
  );
}

export default LogoFC;
