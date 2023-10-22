/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Text,
  Textarea,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import Person1 from "../../assets/images/person-1.jpg";
import { ChevronDownIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { MdOutlinePublic } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { RiLiveFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { Controller, set, useForm } from "react-hook-form";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useCreatePost } from "../../hooks/usePosts";

function CreatePost(props) {
  const [isSelected, setIsSelected] = useState("Public");
  const [isSmallerThan425] = useMediaQuery("(max-width: 425px)");
  // USER INFO
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  //uploading multiple images
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  //FORMS
  const { register, handleSubmit, reset, formState: errors } = useForm();

  //Post
  const { createPost, isLoading } = useCreatePost();

  const handleChange = (e) => {
    if (e.target.files) {
      if (e.target.files.length > 4) {
        toast({
          title: "Error",
          description: "You can only upload up to 4 images",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        return;
      } else {
        for (var i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size > 10485760) {
            toast({
              title: "Error",
              description: "You can only upload up to 10MB",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top"
            });
            return;
          } else {
            const images = e.target.files[i];
            setImages((prevImages) => prevImages.concat(images));
          }
        }
      }
    }
  };

  const removeImage = (image) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
  };

  const handleUpload = async (data) => {
    const promises = [];

    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(
        storage,
        "images/" +
          user.uid +
          "/postImages/" +
          Math.random().toString(36).substring(2) +
          "-" +
          images[i].name
      );

      await uploadBytesResumable(imageRef, images[i]).then((snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        setProgress(progress);

        promises.push(getDownloadURL(snapshot.ref));

        if (progress === 100) {
          setProgress(0);
        } else {
          return;
        }
      });
    }

    const result = await Promise.all(promises);
    const imageURLs = result.map((url) => url);

    console.log({
      post: data.post,
      postVisibility: isSelected,
      images: JSON.stringify(imageURLs)
    });

    await createPost(
      {
        post: data.post,
        postVisibility: isSelected
      },
      JSON.stringify(imageURLs)
    );

    const textAreaVal = document.getElementById("post");
    textAreaVal.value = "";
    setImages([]);
  };

  return (
    <>
      <Flex
        w={props.width ? props.width : "90%"}
        margin={"0 auto"}
        // h={props.height ? props.height : "230px"}
        bg="white"
        borderRadius={10}
        p={3}
        my={3}
      >
        <Avatar
          name={userOtherInfo?.firstName + " " + userOtherInfo?.lastName}
          src={user?.photoURL}
        />
        <Box ml={3} w="100%">
          <Text m={0} fontWeight="bold">
            {user?.displayName ??
              userOtherInfo?.firstName + " " + userOtherInfo?.lastName}
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              px={0}
              m={0}
              py={0}
              bg="none"
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              _active={{ bg: "none" }}
              leftIcon={
                isSelected === "Private" ? (
                  <BiSolidLockAlt />
                ) : (
                  <MdOutlinePublic />
                )
              }
              rightIcon={<ChevronDownIcon />}
            >
              <Text m={0} fontSize={14} mb={0}>
                {isSelected ? isSelected : "Public"}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setIsSelected("Public");
                }}
              >
                <MdOutlinePublic />
                <Text mb={0} ml={2} fontSize={14}>
                  Public
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsSelected("Private");
                }}
              >
                <BiSolidLockAlt />
                <Text mb={0} ml={2} fontSize={14}>
                  Private
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <Flex position={"relative"}>
            <Textarea
              placeholder="What's on your mind?"
              border="none"
              borderBottom={"2px solid #dddfe2"}
              _focus={{ border: "none" }}
              _hover={{ border: "none" }}
              _active={{ border: "none" }}
              resize="none"
              fontSize={14}
              mt={2}
              borderRadius={"10px 10px 0 0 "}
              id="post"
              {...register("post", { required: true })}
              {...(errors.post && { isInvalid: true })}
            />
          </Flex>

          <Flex
            justifyContent="flex-start"
            gap={"1rem"}
            alignItems="center"
            mt={4}
            position={"relative"}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                position={"relative"}
                borderRadius={"1rem"}
                border={"1px solid #dddfe2"}
              >
                <Image
                  src={URL.createObjectURL(image)}
                  width={"100px"}
                  height={"150px"}
                  borderRadius={"1rem"}
                  objectFit={"cover"}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Delete Image"
                  icon={<CloseIcon />}
                  borderRadius={"full"}
                  position={"absolute"}
                  top={"-10px"}
                  right={"-10px"}
                  fontSize={"12px"}
                  onClick={() => removeImage(image)}
                />
              </Box>
            ))}
          </Flex>
          {progress ? (
            <Progress
              value={progress}
              size="md"
              colorScheme="green"
              isIndeterminate
            />
          ) : (
            ""
          )}
          <Flex
            justifyContent={"space-between"}
            alignItems={{
              base: "flex-end",
              md: "center",
              lg: "center"
            }}
            mt={2}
            w={{
              base: "95%",
              md: "100%",
              lg: "100%"
            }}
          >
            <Flex
              gap={{
                base: "2px",
                md: "20px",
                lg: "30px"
              }}
            >
              {/* <Button background={"transparent"} align={"center"}>
                <RiLiveFill
                  color="red"
                  fontSize={{
                    base: "20px",
                    md: "25px",
                    lg: "30px"
                  }}
                />
                {isSmallerThan425 ? null : (
                  <Text
                    ml={2}
                    fontSize={{
                      base: "12px",
                      md: "14px",
                      lg: "16px"
                    }}
                  >
                    Live Video
                  </Text>
                )}
              </Button> */}
              <FormLabel
                htmlFor="upload"
                background={"transparent"}
                align={"center"}
                display={"flex"}
                alignItems={"center"}
                padding={".5rem"}
                borderRadius={"10px"}
                cursor={"pointer"}
                _hover={{
                  bg: "#f0f2f5"
                }}
              >
                <AiFillCamera
                  color="#15855A"
                  fontSize={{
                    base: "20px",
                    md: "25px",
                    lg: "30px"
                  }}
                />
                {isSmallerThan425 ? null : (
                  <Text
                    mb={0}
                    ml={2}
                    fontWeight={"bold"}
                    fontSize={{
                      base: "12px",
                      md: "14px",
                      lg: "16px"
                    }}
                  >
                    Photo / Video
                  </Text>
                )}
              </FormLabel>
              <input
                type="file"
                id="upload"
                style={{ display: "none" }}
                onChange={handleChange}
                multiple
                accept="image/*,video/*"
              />
              {/* <Button background={"transparent"} align={"center"}>
                <BsEmojiLaughing
                  color="#E7D59B"
                  fontSize={{
                    base: "20px",
                    md: "25px",
                    lg: "30px"
                  }}
                />
                {isSmallerThan425 ? null : (
                  <Text
                    ml={2}
                    fontSize={{
                      base: "12px",
                      md: "14px",
                      lg: "16px"
                    }}
                  >
                    Feeling / Activity
                  </Text>
                )}
              </Button> */}
            </Flex>
            <Button
              background={"#0C71F5"}
              color={"white"}
              borderRadius={10}
              px={10}
              py={{
                base: "5px",
                md: 3
              }}
              fontSize={{
                base: "12px",
                md: "14px"
              }}
              fontWeight={"bold"}
              _hover={{
                bg: "#0951af",
                borderRadius: 25,
                transition: "all .4s ease-out"
              }}
              onClick={handleSubmit(handleUpload)}
            >
              Post
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default CreatePost;
