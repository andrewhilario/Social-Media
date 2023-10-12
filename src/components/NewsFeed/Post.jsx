/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Image,
  Text
} from "@chakra-ui/react";
import React from "react";
import Person1 from "../../assets/images/person-1.jpg";
import { HiDotsVertical } from "react-icons/hi";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

function Post({
  width,
  postUser,
  postUserImage,
  post,
  postImages,
  postDateTime,
  postVisibility,
  postLikes,
  postComments,
  postShares
}) {
  const images = JSON.parse(postImages);

  const postImageArray = images.split(",");

  const imagePost = [];

  imagePost.push(postImageArray);

  console.log(imagePost[0].length);

  return (
    <>
      <Card w={width ?? "90%"} m={"10px auto"} p={3}>
        <PostHeader
          name={postUser}
          profileSrc={postUserImage}
          dateTime={postDateTime}
          postVisibility={postVisibility}
        />
        <Text mt={3} px={2} fontSize={14}>
          {post}
        </Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          mt={"1rem"}
          borderRadius={"10px"}
        >
          {imagePost[0].length === 3 ? (
            <>
              <GridItem colSpan={2} borderRadius={"inherit"}>
                <Image
                  borderRadius={"inherit"}
                  src={imagePost[0][0].replace(/[['"]+/g, "")}
                  objectFit={"cover"}
                />
              </GridItem>
              <GridItem colSpan={1} borderRadius={"inherit"}>
                <Image
                  src={imagePost[0][1].replace(/[['"]+/g, "")}
                  objectFit={"cover"}
                  borderRadius={"inherit"}
                />
              </GridItem>
              <GridItem colSpan={1} borderRadius={"inherit"}>
                <Image
                  borderRadius={"inherit"}
                  src={imagePost[0][2].replace(/[['"]+/g, "")}
                  objectFit={"cover"}
                />
              </GridItem>
            </>
          ) : (
            postImageArray &&
            postImageArray.map((image, index) => {
              return (
                <GridItem
                  borderRadius={"inherit"}
                  key={index}
                  colSpan={imagePost[0].length === 1 ? 2 : 1}
                >
                  <Image
                    w={postImageArray.length === 1 && "100%"}
                    h={postImageArray.length === 1 && "100%"}
                    src={image.replace(/[['"]+/g, "")}
                    objectFit={"cover"}
                  />
                </GridItem>
              );
            })
          )}
        </Grid>
        {/* {postImages &&
          postImages.map((image, index) => {
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem key={index}>
                <Image src={image} />
              </GridItem>
            </Grid>;
          })} */}
        <PostFooter />
      </Card>
    </>
  );
}

export default Post;
