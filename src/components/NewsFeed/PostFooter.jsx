/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Link,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BiLike,
  BiSolidLike,
  BiCommentDetail,
  BiSolidCommentDetail
} from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import useLike from "../../hooks/useLike";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useComment from "../../hooks/useComment";
import { useForm } from "react-hook-form";
import { getComment } from "../../hooks/getComments";

function PostFooter({ postId, postAuthorId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isScreenSmall] = useMediaQuery("(max-width: 320px)");
  const [comms, setComments] = useState([]);

  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { register, handleSubmit, formState: error, reset } = useForm();
  //Comments
  const { addComment } = useComment();
  const toast = useToast();
  const { comments } = getComment(postId);

  //Like
  const { toggleLike } = useLike(postId, user?.uid, isLiked);

  const handleToggle = () => {
    toggleLike();
  };
  const getLikesLength = async () => {
    const postRef = doc(db, "posts", postId);

    onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikes(data.likes.length);
        setIsLiked(data.likes.includes(user?.uid));
      }
    });
  };
  //on submit comments
  const onSubmit = (data) => {
    const commentPost = data.comment;
    const fullName = userOtherInfo?.firstName + " " + userOtherInfo?.lastName;
    console.log(fullName);

    document.getElementById("comment").value = "";
    toast({
      title: "Comment added.",
      description: "Your comment has been added.",
      status: "success",
      duration: 5000,
      isClosable: true
    });

    addComment(postId, commentPost, fullName);
  };
  // get comments

  useEffect(() => {
    getLikesLength();
  });

  return (
    <>
      <Flex
        mt={4}
        gap={{
          base: 2,
          md: 4
        }}
      >
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
            onClick={handleToggle}
          >
            {isLiked ? <BiSolidLike color={"#0C71F5"} /> : <BiLike />}
          </Button>
          <Text
            mb={0}
            ml={{
              base: 0,
              md: 1
            }}
            fontSize={14}
          >
            {likes} {isScreenSmall ? "" : "likes"}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
          >
            <BiCommentDetail />
          </Button>
          <Text mb={0} ml={1} fontSize={14}>
            {isScreenSmall ? "" : "comments"}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
          >
            <FaShare />
          </Button>
          <Text mb={0} ml={1} fontSize={14}>
            {isScreenSmall ? "" : "shares"}
          </Text>
        </Flex>
      </Flex>
      <Flex mt={4} align={"center"}>
        <Avatar
          name={userOtherInfo?.firstName + " " + userOtherInfo?.lastName}
          src={user?.photoURL ?? null}
          size={"sm"}
        />
        <Input
          id="comment"
          ml={2}
          placeholder="Write a comment..."
          borderRadius={"full"}
          {...register("comment", { required: true })}
          {...(error.comment && { errorBorderColor: "red.500" })}
        />

        <Button
          ml={2}
          bg={"#0C71F5"}
          color={"white"}
          _hover={{
            bg: "#0C71F5"
          }}
          borderRadius={"full"}
          px={6}
          py={2}
          onClick={handleSubmit(onSubmit)}
        >
          <BsSendFill fontSize={"1.5rem"} />
        </Button>
      </Flex>
      {/* The code below will be added next week */}
      {comments &&
        comments.map((comment, index) => {
          if (index === 1) {
            return (
              <>
                <Flex mt={4} align={"center"} key={index}>
                  <Avatar
                    name={comment?.commentAuthorName ?? ""}
                    src={comment?.commentAuthorImage ?? null}
                    size={"sm"}
                  />
                  <Box
                    ml={2}
                    borderRadius={"20px"}
                    bg={"#f1f1f1"}
                    px={4}
                    py={2}
                  >
                    <Link href={`/profile/${comment?.commentAuthorId ?? ""}`}>
                      <Text mb={0} fontSize={14} fontWeight={"bold"}>
                        {comment?.commentAuthorName ?? ""}
                      </Text>
                    </Link>
                    <Text mb={0} fontSize={14}>
                      {comment.comment ?? ""}
                    </Text>
                  </Box>
                </Flex>
                <Link
                  color={"#0077ff"}
                  href={`/post/${postId}`}
                  ml={1}
                  key={index}
                >
                  <Text
                    mt={4}
                    mb={0}
                    fontSize={14}
                    fontWeight={"bold"}
                    cursor={"pointer"}
                  >
                    View more comments
                  </Text>
                </Link>
              </>
            );
          }
        })}
    </>
  );
}

export default PostFooter;
