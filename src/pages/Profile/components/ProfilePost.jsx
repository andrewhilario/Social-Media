import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Post from "../../../components/NewsFeed/Post";
import CreatePost from "../../../components/NewsFeed/CreatePost";
import { useAuth } from "../../../context/AuthContext";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { usePosts } from "../../../hooks/usePosts";
import { formatDistance } from "date-fns";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ProfilePost() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { posts } = usePosts();

  return (
    <Flex
      w={{
        base: "100%",
        md: "100%",
        lg: "100%"
      }}
      gap={5}
      direction={{
        base: "column",
        md: "column",
        lg: "row"
      }}
    >
      <Flex
        direction={"column"}
        backgroundColor={"white"}
        borderRadius={15}
        p={4}
        my={3}
        height={"fit-content"}
        w={{
          base: "100%",
          md: "100%",
          lg: "30%"
        }}
      >
        <Text fontWeight={"semibold"} letterSpacing={1} fontSize={"2xl"} mb={5}>
          Bio
        </Text>
        <Box mb={10}>
          <Text>{userOtherInfo?.bio}</Text>
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        w={{
          base: "100%",
          md: "100%",
          lg: "60%"
        }}
      >
        <CreatePost
          width={"100%"}
          height={{
            base: "210px",
            md: "230px",
            lg: "230px"
          }}
        />
        {posts?.length === 0 ? (
          <>
            <Text
              fontSize={"2xl"}
              fontWeight={"semibold"}
              letterSpacing={1}
              mb={5}
            >
              Posts
            </Text>
          </>
        ) : (
          posts?.map((post, index) => {
            return (
              <Post
                key={index}
                width={"100%"}
                postUser={post?.postUser}
                postUserImage={post?.postUserImage ?? ""}
                post={post?.post}
                postImages={post?.postImages}
                postDateTime={
                  formatDistance(
                    new Date(post?.createdAt?.toDate()),
                    new Date()
                  ) + " ago"
                }
                postVisibility={post?.postVisibility}
              />
            );
          })
        )}
      </Flex>
    </Flex>
  );
}

export default ProfilePost;
