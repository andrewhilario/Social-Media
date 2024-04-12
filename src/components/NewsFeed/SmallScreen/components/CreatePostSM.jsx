import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  VStack,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchBar } from "../../../SearchBar";
import { LuImage } from "react-icons/lu";
import Person1 from "../../../../assets/images/person-1.jpg";
import useGetUserOtherInfo from "../../../../hooks/useGetUserOtherInfo";
import { useForm } from "react-hook-form";
import { useCreatePost } from "../../../../hooks/usePosts";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase/firebase";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { MdOutlinePublic } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import useAuth from "../../../../context/useAuth";

function CreatePostSM() {
  const [isSelected, setIsSelected] = useState("Public");
  // USER INFO
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  //uploading multiple images
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  const [onFocus, setOnFocus] = useState(false);
  //FORMS
  const { register, handleSubmit, reset, formState: errors } = useForm();

  //Post
  const { createPost, isLoading } = useCreatePost();

  const handleChange = (e) => {
    if (e.target.files) {
      const selectedImages = e.target.files;

      if (selectedImages.length > 4) {
        toast({
          title: "Error",
          description: "You can only upload up to 4 images",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        return;
      }

      const newImages = [...images];

      for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i].size > 10485760) {
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
          newImages.push(selectedImages[i]);
        }
      }

      setImages(newImages);
    }
  };

  const removeImage = (image) => {
    const filteredImages = images.filter((img) => img !== image);
    setImages(filteredImages);
    if (filteredImages.length === 0) {
      window.location.reload();
    }
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
    setOnFocus(true);
  };

  return (
    <>
      <Flex align={"center"} px={2} py={1} gap={3}>
        <VStack align={"center"} justify={"center"} spacing={0}>
          <Avatar src={user?.photoURL} size={"sm"} />
          <Menu w={"100px"}>
            <MenuButton
              as={Button}
              px={0}
              m={0}
              py={0}
              bg="none"
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              _active={{ bg: "none" }}
              rightIcon={<ChevronDownIcon />}
            >
              {isSelected === "Private" ? (
                <BiSolidLockAlt />
              ) : (
                <MdOutlinePublic />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setIsSelected("Public");
                }}
              >
                <MdOutlinePublic />
                <Text ml={2}>Public</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsSelected("Private");
                }}
              >
                <BiSolidLockAlt />
                <Text ml={2}>Private</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </VStack>
        <Box w={"100%"}>
          {onFocus ? (
            <Input
              placeholder={"What's on your mind?"}
              onFocus={() => setOnFocus(false)}
            />
          ) : (
            <Textarea
              id="post"
              placeholder={"What's on your mind?"}
              {...register("post", { required: true })}
              {...(errors.post && { required: true })}
            />
          )}
        </Box>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"space-between"}
          gap={"1rem"}
        >
          <FormLabel
            margin={0}
            htmlFor="upload"
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
          >
            <LuImage />
            <Text fontSize={12} fontWeight={"regular"}>
              Photo
            </Text>
          </FormLabel>
          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={handleChange}
            multiple
            accept="image/*,video/*"
          />
          {!onFocus && (
            <Button
              colorScheme={"blue"}
              size={"sm"}
              variant={"solid"}
              onClick={handleSubmit(handleUpload)}
              fontWeight={"regular"}
            >
              Post
            </Button>
          )}
        </Flex>
      </Flex>
      {images.length > 0 && (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          gap={".5rem"}
          my={4}
        >
          {images.map((image, index) => {
            return (
              <Flex
                key={index}
                w={"100%"}
                align={"center"}
                justify={"space-between"}
                border={"1px solid #ccc"}
                borderRadius={"10px"}
                px={2}
                py={1}
              >
                <Text fontSize={12} fontWeight={"regular"}>
                  {image.name}
                </Text>
                <Button
                  colorScheme={"red"}
                  size={"xs"}
                  variant={"solid"}
                  onClick={() => removeImage(image)}
                >
                  <CloseIcon />
                </Button>
              </Flex>
            );
          })}
        </Flex>
      )}
    </>
  );
}

export default CreatePostSM;
