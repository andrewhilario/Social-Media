/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Layout from "../Layout";
import { FaTrash } from "react-icons/fa";
import backgroundGradients from "./constants/constants";
import { useStories } from "../../hooks/useStories";
import { useAuth } from "../../context/AuthContext";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { useForm } from "react-hook-form";
import { set } from "date-fns";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "blue.600",
          color: "white",
          borderColor: "teal.600"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const Stories = () => {
  const options = ["Create Story with Photo", "Create Story with Text"];
  const [value, setValue] = React.useState("Create Story with Photo");
  const [selectedGradient, setSelectedGradient] = useState("1");
  const [gradient, setGradient] = useState(null);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "createStory",
    defaultValue: "Create Story with Photo",
    onChange: setValue
  });

  const group = getRootProps();

  const [image, setImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [fontSize, setFontSize] = React.useState("md");
  const inputRef = useRef(null);
  const imageRef = useRef(null);
  const { createStories } = useStories();

  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      setFile(img);
    }
  };

  const handleRemoveImage = () => {
    inputRef.current.value = null;
    setImage((inputRef.current.value = null));
    imageRef.current.src = "";
  };

  const handleGradientChange = (value) => {
    setSelectedGradient(value);
    setGradient(value.gradient);
    console.log(value.gradient);
  };

  const onSubmit = async (data) => {
    if (value === "Create Story with Photo") {
      data = {};

      const fullName = `${userOtherInfo.firstName} ${userOtherInfo.lastName}`;

      console.log(file);
      // console.log(data, image, user.uid, fullName, user.photoURL);
      await createStories(file, file, user.uid, fullName, user.photoURL);
    } else {
      const data = {
        text,
        fontSize,
        gradient
      };

      const fullName = `${userOtherInfo.firstName} ${userOtherInfo.lastName}`;

      await createStories(data, null, user.uid, fullName, user.photoURL);

      console.log("Story with text", data);
    }
  };

  return (
    // <div>Stories</div>
    <Layout webName={"UM Connect Stories"}>
      <Flex
        direction={{
          base: "column",
          md: "row",
          lg: "row"
        }}
      >
        {/* Sidebar Create Story */}
        <Box
          borderRight={"1px solid #e6e6e6"}
          h={{
            base: "100%",
            md: "100%",
            lg: "90vh"
          }}
          w={{
            base: "100%",
            md: "40%",
            lg: "30%"
          }}
        >
          <Text mb={0} fontWeight={"bold"} fontSize={"xl"} m={5}>
            Your Story
          </Text>
          <Divider />
          <Flex gap={2} align={"center"} m={5}>
            <Avatar src={user?.photoURL} size={"md"} />
            <Text mb={0} fontWeight={"bold"} fontSize={"md"}>
              {userOtherInfo?.firstName} {userOtherInfo?.lastName}
            </Text>
          </Flex>
          <Divider />
          <HStack {...group} m={5}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          {value === "Create Story with Photo" ? (
            <Flex m={5} direction={"column"} h="65%" gap={5}>
              <Box>
                <Text mb={2}>Image</Text>
                <input ref={inputRef} type="file" onChange={handleOnChange} />
              </Box>
              <Box mt={"auto"} w={"100%"}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                  w={"100%"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Create Story
                </Button>
              </Box>
            </Flex>
          ) : (
            <Flex m={5} direction={"column"} gap={5} h="65%">
              <Box>
                <Textarea
                  placeholder="Start Typing"
                  onChange={(e) => setText(e.target.value)}
                  // {...register("text", { required: true })}
                />
              </Box>
              <Box>
                <Select
                  placeholder="Select Font"
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="xs">
                    <Text fontSize={"xs"}>Super Small</Text>
                  </option>
                  <option value="sm">
                    <Text fontSize={"sm"}>Small</Text>
                  </option>
                  <option value="lg">
                    <Text fontSize={"lg"}>Large</Text>
                  </option>
                  <option value="2xl">
                    <Text fontSize={"2xl"}>2x Large</Text>
                  </option>
                </Select>
              </Box>
              <Box>
                <RadioGroup
                  value={selectedGradient}
                  onChange={handleGradientChange}
                >
                  <Flex gap={10} wrap={"wrap"}>
                    {backgroundGradients?.map((gradient, index) => (
                      <Box
                        key={index}
                        w={"50px"}
                        h={"50px"}
                        borderRadius={"full"}
                        bgGradient={gradient.gradient}
                        cursor="pointer"
                        borderColor={
                          selectedGradient === gradient.name
                            ? "blue.200"
                            : "gray.200"
                        }
                        borderWidth="2px"
                        onClick={() => handleGradientChange(gradient)}
                        _hover={{
                          borderWidth: "3px",
                          borderColor: "blue.200"
                        }}
                      >
                        {selectedGradient === gradient.name && (
                          <Radio
                            type="radio"
                            value={gradient}
                            name={gradient.name}
                            style={{
                              position: "absolute",
                              top: "-9999px",
                              left: "-9999px"
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Flex>
                </RadioGroup>
              </Box>
              <Box mt={"auto"} w={"100%"}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                  w={"100%"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Create Story
                </Button>
              </Box>
            </Flex>
          )}
        </Box>

        <Box
          w={{
            base: "100%",
            md: "90%",
            lg: "75.2%"
          }}
          bg={"#e6e6e6"}
        >
          {/* Preview Box */}
          <Flex
            m={"2rem auto"}
            w={{
              base: "100%",
              md: "90%",
              lg: "50%"
            }}
            bg="white"
            p={5}
            borderRadius={"10px"}
            boxShadow={"md"}
            direction={"column"}
          >
            <Text mb={2}>Preview</Text>
            <Box
              position={"relative"}
              w={"100%"}
              h={{
                base: "50vh",
                md: "60vh",
                lg: "70vh"
              }}
              bg={"#e7e7e7"}
              borderRadius={"7px"}
            >
              {value === "Create Story with Photo" ? (
                <>
                  <Button
                    position={"absolute"}
                    top={"0"}
                    right={"0"}
                    m={2}
                    onClick={handleRemoveImage}
                    p={4}
                    borderRadius={"full"}
                    bg={"#e7e7e7"}
                    _hover={{
                      bg: "#d9d9d9"
                    }}
                  >
                    <FaTrash size={20} color={"#4e4e4e"} />
                  </Button>
                  <Image
                    ref={imageRef}
                    m={"0 auto"}
                    width={{
                      base: "90%",
                      md: "90%",
                      lg: "60%"
                    }}
                    height={"100%"}
                    objectFit={"cover"}
                    src={image}
                    onError={(i) => (i.target.style.display = "none")}
                  />
                </>
              ) : (
                <Box m={"0 auto"} w={"60%"} h={"100%"}>
                  <Flex
                    w={"100%"}
                    h={"100%"}
                    justify={"center"}
                    align={"center"}
                    bg={gradient}
                  >
                    <Input
                      value={text}
                      textAlign={"center"}
                      fontSize={fontSize}
                      border={"transparent"}
                      _focus={{
                        border: "transparent"
                      }}
                      _hover={{
                        border: "transparent"
                      }}
                      _active={{
                        border: "transparent"
                      }}
                      _placeholder={{
                        color: "transparent"
                      }}
                      readOnly
                      bg={"transparent"}
                      color={"white"}
                    />
                  </Flex>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Stories;
