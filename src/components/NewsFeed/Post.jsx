/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Person1 from "../../assets/images/person-1.jpg";
import { HiDotsVertical } from "react-icons/hi";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

function Post(props) {
  return (
    <>
      <Card w="90%" m={"10px auto"} p={3}>
        <PostHeader name={props.name} profileSrc={props.profileImg} />
        <Text mt={3} px={2} fontSize={14}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          tincidunt, nisl eget vestibulum rhoncus, elit nisi aliquet mauris, vel
          tincidunt quam urna sit amet nunc. Nulla facilisi. Suspendisse
          potenti. Nulla facilisi. Suspendisse potenti. Nulla
        </Text>
        {props.postImg && (
          <Box mt={3}>
            <Image borderRadius={10} src={props.postImg} />
          </Box>
        )}
        <PostFooter />
      </Card>
    </>
  );
}

export default Post;
