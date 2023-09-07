/* eslint-disable react/prop-types */
import { Box, Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import PostHeader from "../PostHeader";
import PostFooter from "../PostFooter";

function PostSM(props) {
  return (
    <>
      <Card w="100%" m={"10px auto"} p={3}>
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

export default PostSM;
