/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  Divider,
  Flex,
  Text,
  Box,
  Avatar,
  useDisclosure,
  Textarea,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuItem,
  Image
} from "@chakra-ui/react";
import EditModal from "./EditModal";
import { FaGlobeAsia, FaUserFriends, FaLock } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const [changeBio, setChangeBio] = useState(false);
  const [changeAudience, setChangeAudience] = useState("Public");
  const [photoType, setPhotoType] = useState("profile");
  const [profilePicture, setProfilePicture] = useState(null);
  const { userOtherInfo, isLoading } = useGetUserOtherInfo();
  const [userProfile, setUserProfile] = useState(null);
  const [userCover, setUserCover] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [charCounter, setCharCounter] = useState(0);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose
  } = useDisclosure();

  const handleProfilePhotoChange = () => {
    setPhotoType("profile");
    onEditModalOpen();
  };

  const handleCoverPhotoChange = () => {
    setPhotoType("cover");
    onEditModalOpen();
  };

  function handleChangeAudience() {
    if (changeAudience === "Public") {
      return (
        <>
          <Flex align={"center"} gap={2}>
            <FaGlobeAsia />
            <Text fontSize={"sm"} color={"gray.700"}>
              Public
            </Text>
          </Flex>
        </>
      );
    } else if (changeAudience === "Friends") {
      return (
        <>
          <Flex align={"center"} gap={2}>
            <FaUserFriends />
            <Text fontSize={"sm"} color={"gray.700"}>
              Friends
            </Text>
          </Flex>
        </>
      );
    } else {
      return (
        <>
          <Flex align={"center"} gap={2}>
            <FaLock />
            <Text fontSize={"sm"} color={"gray.700"}>
              Only Me
            </Text>
          </Flex>
        </>
      );
    }
  }

  const handleBioChange = async (data) => {
    try {
      setIsUploading(true);

      const docRef = doc(db, "users", user.uid);
      setDoc(
        docRef,
        {
          bio: data.bio
        },
        { merge: true }
      ).then(() => {
        setIsUploading(false);
        setChangeBio(false);
      });
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const authListener = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserProfile(user?.photoURL);
          setUserCover(userOtherInfo?.coverPhoto);
        }
      });
    };

    authListener();
  }, []);

  return (
    <>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        photoType={photoType}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody mb={4}>
            <Flex direction={"column"}>
              <Flex justify={"space-between"} align={"center"}>
                <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.900"}>
                  Profile Picture
                </Text>
                <Button
                  variant={"ghost"}
                  colorScheme={"blue"}
                  size={"sm"}
                  fontSize={"sm"}
                  onClick={handleProfilePhotoChange}
                >
                  Edit
                </Button>
              </Flex>
              <Flex my={"1rem"} justify={"center"} align={"center"}>
                {userProfile && (
                  <Avatar
                    name={
                      userOtherInfo?.firstName + " " + userOtherInfo?.lastName
                    }
                    size={"2xl"}
                    src={userProfile}
                  />
                )}
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Flex justify={"space-between"} align={"center"}>
                <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.900"}>
                  Cover Photo
                </Text>
                <Button
                  variant={"ghost"}
                  colorScheme={"blue"}
                  size={"sm"}
                  fontSize={"sm"}
                  onClick={handleCoverPhotoChange}
                >
                  Edit
                </Button>
              </Flex>
              <Flex my={"1rem"} justify={"center"} align={"center"}>
                <Box
                  w={"100%"}
                  h={"300px"}
                  backgroundColor={"gray.200"}
                  mb={4}
                  backgroundSize={"cover"}
                  backgroundPosition={"center"}
                  borderRadius={"lg"}
                  margin={"0 auto"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {userCover && (
                    <Image
                      src={userCover}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                    />
                  )}
                </Box>
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Flex justify={"space-between"} align={"center"}>
                <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.900"}>
                  Bio
                </Text>
                <Button
                  variant={"ghost"}
                  colorScheme={"blue"}
                  size={"sm"}
                  fontSize={"sm"}
                  onClick={() => setChangeBio(!changeBio)}
                >
                  Edit
                </Button>
              </Flex>

              {changeBio ? (
                <>
                  <FormControl mt={4} p={"none"} m={"none"}>
                    <Textarea
                      placeholder="Write your Bio"
                      maxLength={200}
                      {...register("bio", {
                        required: true,
                        maxLength: 200
                      })}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) {
                          setCharCounter(e.target.value.length);
                        } else {
                          setCharCounter(200);
                        }
                      }}
                    />
                  </FormControl>
                  <Flex justify={"space-between"} align={"center"} mt={4}>
                    <Text
                      fontSize={"sm"}
                      color={charCounter > 200 ? "red.500" : "gray.700"}
                    >
                      {charCounter}/200
                    </Text>
                    <Flex justify={"flex-end"} align={"center"} mt={4}>
                      <Menu>
                        <MenuButton
                          _hover={{
                            background: "gray.200",
                            transition: "background 0.2s ease-in-out"
                          }}
                          p={2}
                          borderRadius={"md"}
                        >
                          {handleChangeAudience()}
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => setChangeAudience("Public")}>
                            <Flex align={"center"} gap={2}>
                              <FaGlobeAsia />
                              <Text fontSize={"sm"} color={"gray.700"}>
                                Public
                              </Text>
                            </Flex>
                          </MenuItem>
                          <MenuItem
                            onClick={() => setChangeAudience("Friends")}
                          >
                            <Flex align={"center"} gap={2}>
                              <FaUserFriends />
                              <Text fontSize={"sm"} color={"gray.700"}>
                                Friends
                              </Text>
                            </Flex>
                          </MenuItem>
                          <MenuItem
                            onClick={() => setChangeAudience("Only Me")}
                          >
                            <Flex align={"center"} gap={2}>
                              <FaLock />
                              <Text fontSize={"sm"} color={"gray.700"}>
                                Only Me
                              </Text>
                            </Flex>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Button
                        variant={"ghost"}
                        colorScheme={"blue"}
                        size={"sm"}
                        fontSize={"sm"}
                        ml={4}
                        isLoading={isUploading}
                        loadingText={"Submitting..."}
                        onClick={handleSubmit(handleBioChange)}
                      >
                        Submit
                      </Button>
                      <Button
                        variant={"ghost"}
                        colorScheme={"blue"}
                        size={"sm"}
                        fontSize={"sm"}
                        onClick={() => setChangeBio(!changeBio)}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <>
                  <Box p={"1rem"} textAlign={"center"}>
                    <Text color={"gray.700"}>
                      {userOtherInfo?.bio ? userOtherInfo?.bio : "Add your Bio"}
                    </Text>
                  </Box>
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
