import React, { useEffect } from "react";
import CreatePostSM from "./components/CreatePostSM";
import Story from "../Story";
import StorySM from "./StorySM";
import PostSM from "./PostSM";
import Person1 from "../../../assets/images/person-1.jpg";
import Person4 from "../../../assets/images/person-4.jpg";
import Person4Selfie from "../../../assets/images/person-4-selfie.jpg";

import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { usePosts } from "../../../hooks/usePosts";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useGetSharePost } from "../../../hooks/useGetSharePost";
import PostHeader from "../PostHeader";
import SharePostComponent from "../SharePost";
import useAuth from "../../../context/useAuth";

function NewsFeedSM() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { posts, isLoading } = usePosts();
  const navigate = useNavigate();
  const [postUser, setPostUser] = React.useState("");
  const [postUserImage, setPostUserImage] = React.useState(null);
  const { sharePost } = useGetSharePost();
  const [allPostings, setAllPostings] = React.useState([]);

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
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      }
    });

    authListener();
  }, [posts, sharePost]);
  return (
    <>
      <CreatePostSM />
      <StorySM />
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
            console.log("created", post.createdAt.toDate());
            return (
              <Box
                key={post}
                w={"100%"}
                m={"10px auto"}
                p={3}
                bg={"white"}
                borderRadius={"10px"}
                shadow={"lg"}
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
              </Box>
            );
          } else {
            return (
              post.postVisibility === "Public" && (
                <PostSM
                  width={"100%"}
                  key={index}
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
                  userUid={post?.authorId}
                  onPostClick={() => {
                    navigate(`/post/${post?.postId}`);
                  }}
                  postAuthorId={post.authorId}
                  postId={post?.postId}
                />
              )
            );
          }
        })
      )}
    </>
  );
}

export default NewsFeedSM;
