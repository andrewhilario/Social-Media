/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useDisclosure,
  Divider,
  Text,
  Avatar,
  VStack,
  Flex,
  HStack,
  useToast,
  Box
} from "@chakra-ui/react";
import { BsFillSendFill } from "react-icons/bs";
import { commentReel } from "../../../hooks/useReels";
import { useForm } from "react-hook-form";
import useGetOtherUserInfo from "../../../hooks/useGetUserOtherInfo";
import { getCommentReel } from "../../../hooks/useReels";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import useAuth from "../../../context/useAuth";

const ReelComments = ({ isOpenModal, onCloseModal, reelId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { userOtherInfo } = useGetOtherUserInfo();
  const fullName = `${userOtherInfo?.firstName} ${userOtherInfo?.lastName}`;
  const toast = useToast();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const reelRef = doc(db, "reels", reelId);
      onSnapshot(reelRef, (doc) => {
        setComments(doc.data().comments);
      });
    };
    getComments();
  }, [reelId]);

  const onSubmit = async (data) => {
    const comment = {
      reelId: reelId,
      comment: data.comment,
      userId: user.uid,
      userFullname: fullName,
      userProfilePhoto: user.photoURL
    };
    try {
      await commentReel(
        comment.reelId,
        comment.comment,
        comment.userId,
        comment.userFullname,
        comment.userProfilePhoto
      );

      toast({
        title: "Comment added.",
        description: "Your comment has been added.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      reset({
        comment: ""
      });
    } catch (error) {
      console.log(error);
      document.getElementById("comment").value = "";
      toast({
        title: "Error.",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      reset({
        comment: ""
      });
    }

    // clear input
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        size={{
          base: "sm",
          md: "md",
          xl: "xl"
        }}
        onEsc={onCloseModal}
        scrollBehavior={"inside"}
        blockScrollOnMount={false}
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb>
            <Text mb={0} textAlign={"center"}>
              Comments
            </Text>
          </ModalHeader>
          <Divider m={0} background={"#000000"} />
          <ModalBody>
            <Box
              h={{
                base: "100%",
                md: "400px",
                xl: "50vh"
              }}
              overflowY={"scroll"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "0.5em"
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#F2F2F2",
                  borderRadius: "full"
                }
              }}
            >
              {comments?.map((comment, index) => {
                return (
                  <Flex py={4} mb={0} key={index}>
                    <HStack spacing={4}>
                      <Avatar
                        src={comment.userProfilePhoto}
                        name={comment.userFullname}
                        size={"sm"}
                      />
                      <Flex direction={"column"}>
                        <Text m={0} fontWeight={"bold"}>
                          {comment.userFullname}
                        </Text>
                        <Text m={0}>{comment.comment}</Text>
                      </Flex>
                    </HStack>
                  </Flex>
                );
              })}
            </Box>
          </ModalBody>
          <Divider m={0} background={"#000000"} />
          <ModalFooter>
            <Flex align={"center"} w="full">
              <Avatar src={user.photoURL} />
              <Input
                id="commentId"
                ml={4}
                placeholder={"Add a comment..."}
                _placeholder={{ color: "#898989" }}
                border={"none"}
                background={"#F2F2F2"}
                borderRadius={"full"}
                py={4}
                px={6}
                w={"full"}
                {...register("comment")}
              />
              <Button
                ml={4}
                colorScheme={"blue"}
                borderRadius={"full"}
                onClick={handleSubmit(onSubmit)}
              >
                <BsFillSendFill />
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReelComments;
