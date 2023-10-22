/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "../../../components/NewsFeed/Post";
import CreatePost from "../../../components/NewsFeed/CreatePost";
import { useAuth } from "../../../context/AuthContext";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { usePosts } from "../../../hooks/usePosts";
import { formatDistance } from "date-fns";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";

function ProfilePost() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { posts } = usePosts();
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  const { uid } = useParams();

  function getProfile() {
    if (uid) {
      const docRef = doc(db, "users", uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      });
    }
  }

  async function getPost() {
    const postQuery = query(
      collection(db, "posts"),
      where("authorId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const postQuerySnapshot = await getDocs(postQuery);
    const post = [];

    postQuerySnapshot.forEach((doc) => {
      post.push({
        ...doc.data(),
        id: doc.id
      });
    });
    setUserPosts(post);

    console.log(post);
  }

  useEffect(() => {
    getProfile();
    getPost();
    // console.log(userData);
  }, []);

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
          <Text>{userData?.bio}</Text>
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        w={{
          base: "100%",
          md: "100%",
          lg: "70%"
        }}
      >
        {!uid && (
          <CreatePost
            width={"100%"}
            height={{
              base: "210px",
              md: "230px",
              lg: "230px"
            }}
          />
        )}
        {posts?.length === 0 ? (
          <>
            <Text
              fontSize={"2xl"}
              fontWeight={"semibold"}
              letterSpacing={1}
              mb={5}
            >
              No posts
            </Text>
          </>
        ) : !uid ? (
          posts?.map((post, index) => {
            return (
              post?.authorId === user?.uid && (
                <>
                  {/* <Text m={0}>{post?.authorId}</Text> */}

                  <Post
                    key={index}
                    width={"100%"}
                    postUser={post?.postUser}
                    postUserImage={post?.postUserImage ?? null}
                    post={post?.post}
                    postImages={post?.postImages}
                    postDateTime={
                      formatDistance(
                        new Date(post?.createdAt?.toDate()),
                        new Date()
                      ) + " ago"
                    }
                    postVisibility={post?.postVisibility}
                    postAuthorId={post.authorId}
                    postId={post?.postId}
                    onPostClick={() => {
                      navigate(`/post/${post?.postId}`);
                    }}
                  />
                </>
              )
            );
          })
        ) : (
          userPosts?.map((post, index) => {
            return (
              post?.authorId === uid && (
                <Post
                  key={index}
                  width={"100%"}
                  postUser={post?.postUser}
                  postUserImage={post?.postUserImage ?? null}
                  post={post?.post}
                  postImages={post?.postImages}
                  postDateTime={
                    formatDistance(
                      new Date(post?.createdAt?.toDate()),
                      new Date()
                    ) + " ago"
                  }
                  postVisibility={post?.postVisibility}
                  postAuthorId={post.authorId}
                  postId={post?.postId}
                  onPostClick={() => {
                    navigate(`/post/${post?.postId}`);
                  }}
                />
              )
            );
          })
        )}
      </Flex>
    </Flex>
  );
}

export default ProfilePost;
