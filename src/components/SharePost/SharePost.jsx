/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { usePost } from "../../hooks/usePosts";
import { Post } from "../NewsFeed";
import { formatDistance } from "date-fns";
import useSharePost from "../../hooks/useSharePost";

const SharePost = (props) => {
  const postId = props.postId;
  const isShared = props.isShared;
  const { sharePost, isLoading } = useSharePost(postId, isShared);

  const { postData } = usePost(postId);

  useEffect(() => {
    if (props.isOpen) {
      console.log(postId);
      console.log(postData);
    } else {
      console.log("Modal Closed");
    }
  }, [props.isOpen, postId, postData]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={"2xl"}
      orientation="vertical"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent
        w={{
          base: "90%",
          md: "100%",
          lg: "100%"
        }}
      >
        <ModalHeader>Share Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Post
            key={postData?.postId}
            postUser={postData?.postUser}
            postUserImage={postData?.postUserImage ?? ""}
            post={postData?.post}
            postImages={postData?.postImages}
            postVisibility={postData?.postVisibility}
            postAuthorId={postData?.authorId}
            postId={postData?.postId}
            isSharePost={true}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
            onClick={() => {
              sharePost();
              props.onClose();
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }}
          >
            {isLoading ? "Sharing" : "Share"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              props.onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SharePost;
