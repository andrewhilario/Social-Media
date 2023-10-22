import React, { useEffect } from "react";
import Story from "./Story";
import CreatePost from "./CreatePost";
import Post from "./Post";

import { useAuth } from "../../context/AuthContext";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { usePosts } from "../../hooks/usePosts";
import { formatDistance } from "date-fns";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function NewsFeed() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { posts, isLoading } = usePosts();

  const [postUser, setPostUser] = React.useState("");
  const [postUserImage, setPostUserImage] = React.useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(posts.map((post) => post?.authorId));

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
  });

  return (
    <>
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
        posts?.map((post, index) => {
          return (
            post?.postVisibility === "Public" && (
              <Post
                onPostClick={() => {
                  navigate(`/post/${post?.postId}`);
                }}
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
                postAuthorId={post.authorId}
                postId={post?.postId}
              />
            )
          );
        })
      )}
    </>
  );
}

export default NewsFeed;
