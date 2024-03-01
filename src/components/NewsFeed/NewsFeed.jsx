import React, { useEffect } from "react";
import Story from "./Story";
import CreatePost from "./CreatePost";
import Post from "./Post";

import { useAuth } from "../../context/AuthContext";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { usePosts } from "../../hooks/usePosts";
import { formatDistance, set } from "date-fns";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Spinner,
  Text
} from "@chakra-ui/react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ChatBubble from "../ChatBubble/ChatBubble";
import useSharePost from "../../hooks/useSharePost";
import { useGetSharePost } from "../../hooks/useGetSharePost";
import useGetUserInfoById from "../../hooks/useGetUserInfoById";
import PostHeader from "./PostHeader";
import SharePostComponent from "./SharePost";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import PostFooter from "./PostFooter";

function NewsFeed() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { posts, isLoading } = usePosts();
  const { sharePost } = useGetSharePost();

  const [postUser, setPostUser] = React.useState("");
  const [postUserImage, setPostUserImage] = React.useState(null);

  const { fetchUserInfo } = useGetUserInfoById();
  const [allPostings, setAllPostings] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (posts && sharePost) {
      console.log("Original sharePost length:", sharePost.length);

      const postData = posts.map((post) => ({ ...post, type: "original" }));
      const sharedPostData = sharePost.map((post) => ({
        ...post,
        type: "shared"
      }));

      console.log(
        "After mapping - sharedPostData length:",
        sharedPostData.length
      );

      setAllPostings([...postData, ...sharedPostData]);
    }

    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists()) {
            setPostUser(doc.data().firstName + " " + doc.data().lastName);
            setPostUserImage(doc.data().photoURL);
          } else {
            console.log("No such document!");
          }
        });
      }
    });

    authListener();
    return () => {};
  }, [posts, sharePost]);

  return (
    <Box>
      <Story />
      <CreatePost name="Mary Jane Doe" />

      {posts?.length === 0 ? (
        <>
          <Text
            fontWeight={"semibold"}
            letterSpacing={1}
            fontSize={"2xl"}
            mb={5}
          >
            No posts yet
          </Text>
        </>
      ) : isLoading ? (
        <Center mt={10}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        allPostings?.reverse().map((post, index) => {
          if (post.type === "shared") {
            console.log("Shared post:", post);
            return (
              <Box
                key={post}
                w={"90%"}
                m={"10px auto"}
                p={3}
                bg={"white"}
                borderRadius={"10px"}
              >
                <PostHeader
                  name={post.userName}
                  profileSrc={post.userImage}
                  postVisibility={"Public"}
                  dateTime={
                    formatDistance(
                      new Date(post?.createdAt?.toDate()),
                      new Date()
                    ) + " ago"
                  }
                  isSharedPost={true}
                />

                <SharePostComponent postId={post.postId} />
                {/* Create a like and comment */}
                <PostFooter sharedPostId={post?.id} postId={post.postId} />
              </Box>
            );
          } else {
            return (
              post.postVisibility === "Public" && (
                <Post
                  onPostClick={() => {
                    navigate(`/post/${post?.postId}`);
                  }}
                  key={post?.postId}
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
                  postAuthorId={post.authorId}
                  postId={post?.postId}
                />
              )
            );
          }
        })
      )}
    </Box>
  );
}

export default NewsFeed;
