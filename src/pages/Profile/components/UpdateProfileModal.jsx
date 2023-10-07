import { useState } from "react";
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
  MenuItem
} from "@chakra-ui/react";
import EditModal from "./EditModal";
import { FaGlobeAsia, FaUserFriends, FaLock } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const [changeBio, setChangeBio] = useState(false);
  const [changeAudience, setChangeAudience] = useState("Public");
  const [photoType, setPhotoType] = useState("profile");

  const { user } = useAuth();
  const { userOtherInfo, isLoading } = useGetUserOtherInfo();

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
                <Avatar size={"2xl"} src={user?.photoURL ?? ""} />
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
                  backgroundImage={`url(${userOtherInfo?.coverPhoto ?? ""})`}
                  backgroundSize={"cover"}
                  backgroundPosition={"center"}
                  borderRadius={"lg"}
                  margin={"0 auto"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {!userOtherInfo?.coverPhoto && <Avatar size={"2xl"} />}
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
                    <Textarea placeholder="Write your Bio" />
                  </FormControl>
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
                            <Icon as={FaGlobeAsia} />
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Public
                            </Text>
                          </Flex>
                        </MenuItem>
                        <MenuItem onClick={() => setChangeAudience("Friends")}>
                          <Flex align={"center"} gap={2}>
                            <Icon as={FaUserFriends} />
                            <Text fontSize={"sm"} color={"gray.700"}>
                              Friends
                            </Text>
                          </Flex>
                        </MenuItem>
                        <MenuItem onClick={() => setChangeAudience("Only Me")}>
                          <Flex align={"center"} gap={2}>
                            <Icon as={FaLock} />
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
                      onClick={() => setChangeBio(!changeBio)}
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
                </>
              ) : (
                <>
                  <Box p={"1rem"} textAlign={"center"}>
                    <Text color={"gray.700"}>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Facere fugiat amet itaque suscipit neque voluptatibus
                      laboriosam! Voluptate porro modi aliquid.
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
