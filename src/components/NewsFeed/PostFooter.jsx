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
  useToast,
  useDisclosure
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

import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import useLike, { useSharePostLike } from "../../hooks/useLike";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useComment from "../../hooks/useComment";
import { useForm } from "react-hook-form";
import { getComment } from "../../hooks/getComments";
import { SharePost } from "../SharePost";
import useSharePost from "../../hooks/useSharePost";
import useAuth from "../../context/useAuth";

function PostFooter({ postId, sharedPostId, postAuthorId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [isScreenSmall] = useMediaQuery("(max-width: 320px)");
  const [comms, setComments] = useState([]);
  const [sharedPostLikesData, setSharedPostLikesData] = useState(null); // shared post likes data
  const [likesData, setLikesData] = useState({
    postId: null, // Regular post ID
    sharedPostId: null, // Shared post ID
    likes: 0,
    isLiked: false
  });

  // sharedpost footer
  const [sharedPostLikes, setSharedPostLikes] = useState(0);
  const [sharedPostShares, setSharedPostShares] = useState(0);
  const [sharedPostIsLiked, setSharedPostIsLiked] = useState(false);
  const [sharedPostIsShared, setSharedPostIsShared] = useState(false);

  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { register, handleSubmit, formState: error, reset } = useForm();
  //Comments
  const { addComment } = useComment();
  const toast = useToast();
  const { comments } = getComment(sharedPostId ? sharedPostId : postId);

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

    if (sharedPostId) {
      addComment(sharedPostId, commentPost, fullName);
    } else {
      addComment(postId, commentPost, fullName);
    }
  };

  // const handleToggle = async () => {
  //   await toggleLike();

  //   if (sharedPostId) {
  //     console.log("Toggling like for shared post");
  //     toggleLikeShared();
  //   }
  // };
  const { toggleLike } = useLike(postId, user?.uid, likesData.isLiked);
  const { toggleLikeShared } = useSharePostLike(
    sharedPostId,
    user?.uid,
    sharedPostLikesData?.isLiked
  ); // Assuming sharedPostLikesData has isLiked

  const handleToggle = async () => {
    if (sharedPostId) {
      await toggleLikeShared();
    } else {
      await toggleLike();
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikesData({
          postId,
          likes: data.likes?.length ?? 0,
          isLiked: data.likes?.includes(user?.uid) ?? false
        });
      }
    });

    return unsubscribe;
  }, [postId, user?.uid]);

  useEffect(() => {
    if (sharedPostId) {
      const postRef = doc(db, "shared-posts", sharedPostId);
      const unsubscribe = onSnapshot(postRef, (doc) => {
        if (doc.exists()) {
          setSharedPostLikesData(doc.data());
        }
      });

      return unsubscribe;
    }
  }, [sharedPostId]);

  return (
    <>
      <Flex
        mt={4}
        gap={{
          base: 2,
          md: 4
        }}
      >
        <SharePost
          isOpen={isOpen}
          onClose={onClose}
          postId={postId}
          isShared={isShared}
        />
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
            {sharedPostLikesData?.isLiked ? (
              <BiSolidLike color="#0C71F5" />
            ) : likesData.isLiked ? (
              <BiSolidLike color="#0C71F5" />
            ) : (
              <BiLike />
            )}
          </Button>
          <Text
            mb={0}
            ml={{
              base: 0,
              md: 1
            }}
            fontSize={14}
          >
            {sharedPostLikesData?.likes.length || likesData.likes.length}{" "}
            {isScreenSmall ? "" : "likes"}
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
            _hover={{
              bg: "#0C71F5",
              color: "white"
            }}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
            onClick={onOpen}
          >
            <FaShare />
          </Button>
          <Text mb={0} ml={1} fontSize={14}>
            {sharedPostId ? sharedPostShares : shares}{" "}
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
                  href={`/post/${sharedPostId ? sharedPostId : postId}`}
                  ml={1}
                  key={sharedPostId ? sharedPostId : postId}
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
