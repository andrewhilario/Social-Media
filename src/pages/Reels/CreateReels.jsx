import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Text,
  Heading
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import Layout from "../../pages/Layout";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { useReels } from "../../hooks/useReels";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

function CreateReels() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { createReel } = useReels();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  const toast = useToast();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [height, setHeight] = useState("100vh");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // TODO: Implement form submission logic here
      const fullName = `${userOtherInfo.firstName} ${userOtherInfo.lastName}`;
      const userId = user.uid;
      const userProfilePhoto = user.photoURL;

      const reelData = {
        ...data
      };

      await createReel(reelData, videoFile, userId, fullName, userProfilePhoto);

      toast({
        title: "Reel created.",
        description: "Your new reel has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      reset();
      setVideoFile(null);
      setVideoPreviewUrl("");
      setIsFileSelected(false);
      setHeight("100vh");
      setVideoFile(null);
      navigate("/reels");
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: "Unable to create reel. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
      reset();
      setVideoPreviewUrl("");
      setIsFileSelected(false);
      setHeight("100vh");
      setVideoFile(null);
    }
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        // 10 MB in bytes
        toast({
          title: "File too large",
          description: "The selected video file exceeds the 10 MB limit.",
          status: "error",
          duration: 5000,
          isClosable: true
        });
        // Reset the input if the file is too large
        event.target.value = "";
        setVideoPreviewUrl("");
        setIsFileSelected(false);
        return;
      }
      const videoUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(videoUrl);
      setIsFileSelected(true);
      setHeight("100%");
    } else {
      setVideoPreviewUrl("");
      setIsFileSelected(false);
    }
    setVideoFile(file);
  };

  return (
    <Layout webName={"UM Connect"}>
      <Flex justify="center" align="center" backgroundColor={"#e6e6e6"}>
        <Flex
          flexDirection={"column"}
          width="500px"
          height={height}
          backgroundColor={"white"}
          p={"20px"}
        >
          <Heading as="h1" fontSize={"26px"} color={"blue.600"} mb={"25px"}>
            Create your Reels and share with your friends
          </Heading>
          <Box w={"100%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Enter a title for your reel"
                  {...register("title", { required: true })}
                />
                <FormErrorMessage>
                  {errors.title && "Title is required"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description} mt={4}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter a description for your reel"
                  {...register("description", { required: true })}
                />
                <FormErrorMessage>
                  {errors.description && "Description is required"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.videoFile} mt={4}>
                <FormLabel htmlFor="videoFile">Video File</FormLabel>
                {isFileSelected ? (
                  <>
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setVideoPreviewUrl("");
                        setIsFileSelected(false);
                        setHeight("100vh");
                        setVideoFile(null);
                      }}
                      marginLeft="5px"
                    >
                      Remove
                    </Button>
                    <Text marginLeft="5px">{videoFile.name}</Text>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      id="videoFile"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                    />
                    <FormErrorMessage>
                      {errors.videoFile && "Video file is required"}
                    </FormErrorMessage>
                  </>
                )}
              </FormControl>

              {videoPreviewUrl && (
                <Box mt={4}>
                  <ReactPlayer
                    url={videoPreviewUrl}
                    width="100%"
                    height="710px"
                    controls
                    style={{ borderRadius: "20px", overflow: "hidden" }}
                  />
                </Box>
              )}

              <Button
                width={"100%"}
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Create Reel
              </Button>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default CreateReels;
