/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import Person1 from "../../assets/images/person-1.jpg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdOutlinePublic } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { RiLiveFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";

function CreatePost(props) {
  const [isSelected, setIsSelected] = React.useState("");
  const [isSmallerThan425] = useMediaQuery("(max-width: 425px)");

  return (
    <>
      <Flex
        w={{
          base: "100%",
          md: "100%",
          lg: "90%"
        }}
        margin={"0 auto"}
        h={props.height ? props.height : "230px"}
        bg="white"
        borderRadius={10}
        p={3}
        my={3}
      >
        <Avatar src={Person1} />
        <Box ml={3} w="100%">
          <Text fontWeight="bold">{props.name}</Text>
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
              Icon
            >
              <Text fontSize={14}>{isSelected ? isSelected : "Public"}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setIsSelected("Public");
                }}
              >
                <MdOutlinePublic />
                <Text ml={2} fontSize={14}>
                  Public
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsSelected("Private");
                }}
              >
                <BiSolidLockAlt />
                <Text ml={2} fontSize={14}>
                  Private
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
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
          />
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
              <Button background={"transparent"} align={"center"}>
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
              </Button>
              <Button background={"transparent"} align={"center"}>
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
                    ml={2}
                    fontSize={{
                      base: "12px",
                      md: "14px",
                      lg: "16px"
                    }}
                  >
                    Photo / Video
                  </Text>
                )}
              </Button>
              <Button background={"transparent"} align={"center"}>
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
              </Button>
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
