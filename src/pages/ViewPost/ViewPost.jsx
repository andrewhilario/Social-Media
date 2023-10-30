/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Indicator,
  Input,
  Text,
  Link as ChakraLink,
  useMediaQuery,
  useToast,
  Center,
  CircularProgress
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import TestImage from "../../assets/images/cover-photo.jpg";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";
import { BiLike, BiComment, BiSolidLike } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { BsSendFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { formatDistance, formatDistanceToNow, set } from "date-fns";
import { CloseIcon } from "@chakra-ui/icons";

import useLike from "../../hooks/useLike";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import useComment from "../../hooks/useComment";
import { getComment } from "../../hooks/getComments";
import { useForm } from "react-hook-form";

function ViewPost() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const [postImage, setPostImageArray] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { postId } = useParams();
  const [postUser, setPostUser] = useState("");
  const [postUserImage, setPostUserImage] = useState("");
  const [postDateTime, setPostDateTime] = useState("");
  const [post, setPost] = useState("");
  const [postVisibility, setPostVisibility] = useState("Public");
  const [authorId, setAuthorId] = useState("");
  const { register, handleSubmit, formState: error, reset } = useForm();
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery("(max-width: 425px)");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { addComment } = useComment();
  const { comments } = getComment(postId);

  const getPostImage = () => {
    const postRef = doc(db, "posts", postId);
    onSnapshot(postRef, (doc) => {
      setIsLoading(true);
      try {
        const images = JSON.parse(doc.data()?.postImages);
        const postImageArray = images.split(",");
        const imagePost = [];

        imagePost.push(postImageArray);

        const image = imagePost[0];

        const parse = JSON.parse(image);
        setPostImageArray(parse); // Set the post images in the state
        setPostUser(doc.data()?.postUser); // Set the post user in the state
        setPostUserImage(doc.data()?.postUserImage); // Set the post user image in the state
        setPostDateTime(
          formatDistance(
            new Date(doc.data()?.createdAt?.toDate()),
            new Date()
          ) + " ago"
        ); // Set the post date time in the state
        setPost(doc.data()?.post); // Set the post in the state
        setPostVisibility(doc.data()?.postVisibility); // Set the post visibility in the state
        setAuthorId(doc.data()?.authorId); // Set the author id in the state
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getPostImage();
    // console.log("Post image: ", postImage[0]);
  }, []);

  // get Likes

  const { toggleLike } = useLike(postId, user?.uid, isLiked);

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

  useEffect(() => {
    getLikesLength();
  });

  //Comments

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

  return (
    <Layout navMargin={0}>
      {isLoading ? (
        <Center minH={"100vh"}>
          <CircularProgress isIndeterminate color={"#0C71F5"} />
        </Center>
      ) : postImage.length >= 1 ? (
        <Flex
          w={"100%"}
          direction={{
            base: "column",
            md: "column",
            lg: "row"
          }}
        >
          <Box
            w={{
              base: "100%",
              md: "100%",
              lg: "70%"
            }}
          >
            <CloseButton
              position={"absolute"}
              top={{
                base: "4rem",
                md: "4rem",
                lg: "7rem"
              }}
              left={{
                base: "0",
                md: "0",
                lg: "2rem"
              }}
              display={postImage.length <= 1 ? "flex" : "none"}
              color={"white"}
              zIndex={2}
              fontSize={"1.5rem"}
              padding={"2rem"}
              borderRadius={"full"}
              onClick={() => {
                navigate(-1); // Go back to the previous page
              }}
            />

            <CCarousel
              style={{
                display: postImage.length < 1 ? "none" : "block"
              }}
              controls
              interval={false}
              onSlid={(e) => {
                if (e === postImage.length - 1) {
                  const next = document.querySelector(".carousel-control-next");
                  const prev = document.querySelector(".carousel-control-prev");

                  next.style.display = "none";
                  prev.style.display = "block";
                }
                // if first slide

                if (e === 0) {
                  const next = document.querySelector(".carousel-control-next");
                  const prev = document.querySelector(".carousel-control-prev");

                  prev.style.display = "none";
                  next.style.display = "block";
                }

                // if (e !== 0 && e !== postImage.length - 1) {
                //   const next = document.querySelector(".carousel-control-next");
                //   const prev = document.querySelector(".carousel-control-prev");

                //   next.style.display = "block";
                //   prev.style.display = "block";
                // }
              }}
            >
              {postImage.map((image, index) => {
                const imageSlide = image.replace(/[['"]+/g, "");
                return (
                  <CCarouselItem
                    key={index}
                    style={{
                      height: window.innerHeight - 94,
                      width: "100%",
                      background: "#969696"
                    }}
                  >
                    <CImage
                      className="d-block w-100 h-100 object-fit-contain"
                      src={imageSlide}
                      alt="slide 1"
                    />
                  </CCarouselItem>
                );
              })}

              {/* <CCarouselItem>
                            <CImage className="d-block w-100" src={TestImage} alt="slide 1" />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={TestImage} alt="slide 2" />
                          </CCarouselItem>
                          <CCarouselItem>
                            <CImage className="d-block w-100" src={TestImage} alt="slide 3" />
                          </CCarouselItem> */}
            </CCarousel>
          </Box>
          <Box
            bg={postImage.length < 1 ? "white" : "transparent"}
            w={{
              base: "100%",
              md: "100%",
              lg: "30%"
            }}
          >
            <Flex p={4}>
              <Avatar
                size={"lg"}
                name={postUser}
                marginRight={4}
                src={postUserImage}
              />
              <Flex direction={"column"}>
                <Link to={`/profile/${authorId}`}>
                  <Text
                    margin={0}
                    fontWeight={"bold"}
                    fontSize={"1.2rem"}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {postUser}
                  </Text>
                </Link>
                {/* <Text margin={0} fontWeight={"bold"} fontSize={"1.2rem"}>
                        {postUser}
                      </Text> */}
                <HStack spacing={2}>
                  <Text margin={0}>{postDateTime + " ago"}</Text>
                  {postVisibility === "Public" ? (
                    <BsGlobeAsiaAustralia fontSize={14} />
                  ) : (
                    <IoLockClosed fontSize={14} />
                  )}
                </HStack>
              </Flex>
            </Flex>
            <Box pb={4} px={4}>
              <Text>{post}</Text>
            </Box>
            <Text ml={4} textColor={"#0C71F5"}>
              {likes} likes
            </Text>
            <Flex
              px={4}
              py={4}
              pb={4}
              w={"95%"}
              margin={"0 auto"}
              borderTop={"1px solid #c7c7c7"}
              borderBottom={"1px solid #c7c7c7"}
            >
              <HStack
                w={"100%"}
                justify={"space-between"}
                spacing={4}
                // px={"2rem"}
              >
                <Button
                  background={"transparent"}
                  onClick={toggleLike}
                  _hover={{
                    background: "transparent"
                  }}
                >
                  <HStack align={"center"} spacing={2}>
                    {isLiked ? <BiSolidLike color={"#0C71F5"} /> : <BiLike />}
                    <Text m={0} textColor={isLiked ? "#0C71F5" : "black"}>
                      Like
                    </Text>
                  </HStack>
                </Button>
                <HStack align={"center"} spacing={2}>
                  <BiComment fontSize={24} />
                  <Text m={0} fontWeight={"bold"}>
                    Comment
                  </Text>
                </HStack>
                <HStack align={"center"} spacing={2}>
                  <PiShareFatBold fontSize={24} />
                  <Text m={0} fontWeight={"bold"}>
                    Share
                  </Text>
                </HStack>
              </HStack>
            </Flex>
            <Flex
              align={"center"}
              px={4}
              py={4}
              w={"95%"}
              margin={"0 auto"}
              gap={4}
            >
              <Avatar
                size={"md"}
                src={user?.photoURL}
                border={"1px solid #0077ff"}
              />
              <Input
                id="comment"
                border={"2px solid #c7c7c7"}
                placeholder={"Write a comment..."}
                borderRadius={"full"}
                w={"100%"}
                {...register("comment", { required: true })}
                {...(error.comment && { errorBorderColor: "red.500" })}
              />
              <Button
                bg={"#0C71F5"}
                color={"white"}
                _hover={{
                  bg: "#0C71F5"
                }}
                borderRadius={"full"}
                py={2}
                onClick={handleSubmit(onSubmit)}
              >
                <BsSendFill fontSize={"1.5rem"} />
              </Button>
            </Flex>
            {comments &&
              comments.map((comment, index) => {
                return (
                  <Flex
                    key={index}
                    align={"center"}
                    px={4}
                    py={2}
                    w={"95%"}
                    margin={"0 auto"}
                  >
                    <Avatar
                      name={comment?.commentAuthorName ?? ""}
                      src={comment?.commentAuthorImage ?? null}
                      size={"sm"}
                    />
                    <Box
                      w={"100%"}
                      ml={2}
                      borderRadius={"20px"}
                      bg={"#f1f1f1"}
                      px={4}
                      py={2}
                    >
                      <ChakraLink
                        href={`/profile/${comment?.commentAuthorId ?? ""}`}
                        color={"# "}
                      >
                        <Text mb={0} fontSize={14} fontWeight={"bold"}>
                          {comment?.commentAuthorName ?? ""}
                        </Text>
                      </ChakraLink>
                      <Text mb={0} fontSize={14}>
                        {comment.comment ?? ""}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
          </Box>
        </Flex>
      ) : (
        <Flex
          bg={"#f0f2f5"}
          minH={"100vh"}
          px={{
            base: 0,
            md: 5
          }}
          justify={"center"}
        >
          <Box
            bg={postImage.length < 1 ? "white" : "transparent"}
            w={{
              base: "100%",
              md: "100%",
              lg: "40%"
            }}
            shadow={"md"}
          >
            <Flex p={4}>
              <Avatar
                size={"lg"}
                name={postUser}
                marginRight={4}
                src={postUserImage}
              />
              <Flex direction={"column"}>
                <Link to={`/profile/${authorId}`}>
                  <Text
                    margin={0}
                    fontWeight={"bold"}
                    fontSize={"1.2rem"}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {postUser}
                  </Text>
                </Link>
                {/* <Text margin={0} fontWeight={"bold"} fontSize={"1.2rem"}>
                        {postUser}
                      </Text> */}
                <HStack spacing={2}>
                  <Text margin={0}>{postDateTime + " ago"}</Text>
                  {postVisibility === "Public" ? (
                    <BsGlobeAsiaAustralia fontSize={14} />
                  ) : (
                    <IoLockClosed fontSize={14} />
                  )}
                </HStack>
              </Flex>
            </Flex>
            <Box pb={4} px={4}>
              <Text>{post}</Text>
            </Box>
            <Text ml={4} textColor={"#0C71F5"}>
              {likes} likes
            </Text>
            <Flex
              px={4}
              py={4}
              pb={4}
              w={"95%"}
              margin={"0 auto"}
              borderTop={"1px solid #c7c7c7"}
              borderBottom={"1px solid #c7c7c7"}
            >
              <HStack
                w={"100%"}
                justify={"space-between"}
                spacing={4}
                // px={"2rem"}
              >
                <Button
                  background={"transparent"}
                  onClick={toggleLike}
                  _hover={{
                    background: "transparent"
                  }}
                >
                  <HStack align={"center"} spacing={2}>
                    {isLiked ? (
                      <BiSolidLike color={"#0C71F5"} fontSize={24} />
                    ) : (
                      <BiLike fontSize={24} />
                    )}
                    <Text m={0} textColor={isLiked ? "#0C71F5" : "black"}>
                      Like
                    </Text>
                  </HStack>
                </Button>
                <HStack align={"center"} spacing={2}>
                  <BiComment fontSize={24} />
                  <Text m={0} fontWeight={"bold"}>
                    Comment
                  </Text>
                </HStack>
                <HStack align={"center"} spacing={2}>
                  <PiShareFatBold fontSize={24} />
                  <Text m={0} fontWeight={"bold"}>
                    Share
                  </Text>
                </HStack>
              </HStack>
            </Flex>
            <Flex
              align={"center"}
              px={4}
              py={4}
              w={"95%"}
              margin={"0 auto"}
              gap={4}
            >
              <Avatar
                size={"md"}
                src={user?.photoURL}
                border={"1px solid #0077ff"}
              />
              <Input
                id="comment"
                border={"2px solid #c7c7c7"}
                placeholder={"Write a comment..."}
                borderRadius={"full"}
                w={"100%"}
                {...register("comment", { required: true })}
                {...(error.comment && { errorBorderColor: "red.500" })}
              />
              <Button
                bg={"#0C71F5"}
                color={"white"}
                _hover={{
                  bg: "#0C71F5"
                }}
                borderRadius={"full"}
                py={2}
                onClick={handleSubmit(onSubmit)}
              >
                <BsSendFill fontSize={"1.5rem"} />
              </Button>
            </Flex>
            {comments &&
              comments.map((comment, index) => {
                return (
                  <Flex
                    align={"center"}
                    px={4}
                    py={4}
                    w={"95%"}
                    margin={"0 auto"}
                  >
                    <Avatar
                      name={comment?.commentAuthorName ?? ""}
                      src={comment?.commentAuthorImage ?? null}
                      size={"sm"}
                    />
                    <Box
                      w={"100%"}
                      ml={2}
                      borderRadius={"20px"}
                      bg={"#f1f1f1"}
                      px={4}
                      py={2}
                    >
                      <ChakraLink
                        href={`/profile/${comment?.commentAuthorId ?? ""}`}
                        color={"# "}
                      >
                        <Text mb={0} fontSize={14} fontWeight={"bold"}>
                          {comment?.commentAuthorName ?? ""}
                        </Text>
                      </ChakraLink>
                      <Text mb={0} fontSize={14}>
                        {comment.comment ?? ""}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
          </Box>
        </Flex>
      )}
    </Layout>
  );
}

export default ViewPost;
