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
import React, { useEffect } from "react";
import Person1 from "../../assets/images/person-1.jpg";
import { HiDotsVertical } from "react-icons/hi";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

function Post({
  isSharePost,
  width,
  postUser,
  postUserImage,
  post,
  postImages,
  postDateTime,
  postVisibility,
  postAuthorId,
  onPostClick,
  postId,
  postLikes,
  postComments,
  postShares
}) {
  const images = JSON.parse(postImages);

  const postImageArray = images.split(",");

  const imagePost = [];

  imagePost.push(postImageArray);

  const image = imagePost[0];

  const parse = JSON.parse(image);

  return (
    <>
      <Card
        w={width ? width : isSharePost ? "100%" : "90%"}
        m={"10px auto"}
        p={3}
        border={!isSharePost ? "none" : "1px solid #21559d"}
      >
        <PostHeader
          name={postUser}
          profileSrc={postUserImage}
          dateTime={postDateTime}
          postVisibility={postVisibility}
          postAuthorUid={postAuthorId}
          onPostClick={onPostClick}
        />
        <Text mb={0} mt={3} px={2} fontSize={14}>
          {post}
        </Text>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={2}
          mt={postImageArray.length === 0 ? "0" : "1rem"}
          borderRadius={"10px"}
          w={"100%"}
          // h={parse.length === 1 ? "82vh" : "auto"}
        >
          {parse.map((image, index) => {
            const imageSlide = image.replace(/[['"]+/g, "");
            if (parse.length === 3) {
              switch (index) {
                case 0:
                  return (
                    <GridItem key={index} colSpan={2} borderRadius={"10px"}>
                      <Image
                        className="d-block w-100 h-100 object-fit-contain"
                        src={imageSlide}
                        alt="slide 1"
                        borderRadius={"10px"}
                      />
                    </GridItem>
                  );
                case 1:
                  return (
                    <GridItem key={index} colSpan={1} borderRadius={"10px"}>
                      <Image
                        className="d-block w-100 h-100 object-fit-contain"
                        src={imageSlide}
                        alt="slide 1"
                        borderRadius={"10px"}
                      />
                    </GridItem>
                  );
                case 2:
                  return (
                    <GridItem key={index} colSpan={1} borderRadius={"10px"}>
                      <Image
                        className="d-block w-100 h-100 object-fit-contain"
                        src={imageSlide}
                        alt="slide 1"
                        borderRadius={"10px"}
                      />
                    </GridItem>
                  );
              }
            } else {
              if (parse.length === 1) {
                return (
                  <GridItem
                    key={index}
                    colSpan={2}
                    rowSpan={1}
                    style={{
                      width: "100%",
                      height: "500px",
                      background: "#969696"
                    }}
                    borderRadius={"10px"}
                  >
                    <Image
                      className="d-block w-100 h-100 object-fit-contain"
                      src={imageSlide}
                      alt="slide 1"
                      borderRadius={"10px"}
                    />
                  </GridItem>
                );
              } else {
                return (
                  <GridItem
                    key={index}
                    colSpan={1}
                    rowSpan={1}
                    style={{
                      width: "100%",
                      background: "#969696"
                    }}
                    borderRadius={"10px"}
                  >
                    <Image
                      className="d-block w-100 h-100 object-fit-contain"
                      src={imageSlide}
                      alt="slide 1"
                      borderRadius={"10px"}
                    />
                  </GridItem>
                );
              }
            }
          })}
        </Grid>
        {!isSharePost && (
          <PostFooter postId={postId} postAuthorId={postAuthorId} />
        )}
      </Card>
    </>
  );
}

export default Post;
