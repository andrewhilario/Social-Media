import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function DashboardCard(props) {
  return (
    <>
      <Card
        padding={"2rem"}
        borderRadius={"10px"}
        boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"start"}
          gap={"1rem"}
        >
          <FontAwesomeIcon
            icon={props.icon}
            style={{
              fontSize: "3rem",
              color: "#3182ce"
            }}
          />
          <Text
            fontSize={"1rem"}
            fontWeight={"bold"}
            color={"gray.500"}
            alignSelf={"center"}
          >
            {props.text}
          </Text>
        </Flex>
        <Text
          fontSize={"2rem"}
          fontWeight={"bold"}
          color={"blue.500"}
          alignSelf={"center"}
        >
          {props.value}
        </Text>
      </Card>
    </>
  );
}

export default DashboardCard;
