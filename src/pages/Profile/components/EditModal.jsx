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
  Text,
  Box,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../context/AuthContext";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { auth, storage } from "../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { onAuthStateChanged } from "firebase/auth";

function EditModal(props) {
  const [photoFile, setPhotoFile] = useState(null);
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const { userOtherInfo, isLoading } = useGetUserOtherInfo();
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handlePhotoFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileChange = () => {
    setIsUploading(true);
    if (photoFile) {
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      const uploadTask = uploadBytes(imageRef, photoFile);

      uploadTask.then((snapshot) => {
        console.log(snapshot.ref.fullPath);
      });

      toast({
        title: "Profile photo updated.",
        status: "success",
        duration: 1000,
        isClosable: true
      });
    } else {
      setIsUploading(false);
      toast({
        title: "No photo selected.",
        status: "error",
        duration: 1000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.photoType === "profile" ? (
            <>
              <FormControl position={"relative"}>
                {photoFile ? (
                  <>
                    <Box
                      w={"100%"}
                      h={"400px"}
                      backgroundColor={"gray.200"}
                      borderRadius={"full"}
                      mb={4}
                      backgroundImage={`url(${photoFile})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                      border={"4px solid #3182ce"}
                    >
                      <Button
                        position={"absolute"}
                        top={2}
                        right={2}
                        onClick={() => setPhotoFile(null)}
                        borderRadius={"full"}
                        p={0}
                        background={"whiteAlpha.500"}
                      >
                        <CloseIcon color={"gray.700"} boxSize={"12px"} />
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <FormLabel
                      htmlFor="uploadProfilePhoto"
                      display={"flex"}
                      alignItems={"center"}
                      py={4}
                      px={2}
                      borderRadius={"md"}
                      cursor={"pointer"}
                      _hover={{
                        background: "gray.200",
                        transition: "background 0.2s ease-in-out"
                      }}
                    >
                      <Box
                        borderRadius={"full"}
                        background={"gray.500"}
                        p={"1rem"}
                      >
                        <FiUpload color="white" fontSize={"1.5rem"} />
                      </Box>
                      <Text ml={4} as="span">
                        Upload Profile Photo
                      </Text>
                    </FormLabel>
                    <input
                      style={{
                        opacity: 0,
                        position: "absolute",
                        zIndex: -1
                      }}
                      type="file"
                      id="uploadProfilePhoto"
                      onChange={handlePhotoFileChange}
                    />
                  </>
                )}
              </FormControl>
              <Box display={"flex"} justifyContent={"flex-end"} mt={4}>
                <Button
                  colorScheme="facebook"
                  onClick={handleProfileChange}
                  isLoading={isUploading}
                  loadingText="Uploading"
                >
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              <FormControl position={"relative"}>
                {photoFile ? (
                  <>
                    <Box
                      w={"100%"}
                      h={"200px"}
                      backgroundColor={"gray.200"}
                      borderRadius={"1rem"}
                      mb={4}
                      backgroundImage={`url(${photoFile})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                      border={"4px solid #3182ce"}
                    >
                      <Button
                        position={"absolute"}
                        top={2}
                        right={2}
                        onClick={() => setPhotoFile(null)}
                        borderRadius={"full"}
                        p={0}
                        background={"whiteAlpha.500"}
                        // colorScheme="red"
                      >
                        <CloseIcon color={"gray.700"} boxSize={"12px"} />
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <FormLabel
                      htmlFor="uploadProfilePhoto"
                      display={"flex"}
                      alignItems={"center"}
                      py={4}
                      px={2}
                      borderRadius={"md"}
                      cursor={"pointer"}
                      _hover={{
                        background: "gray.200",
                        transition: "background 0.2s ease-in-out"
                      }}
                    >
                      <Box
                        borderRadius={"full"}
                        background={"gray.500"}
                        p={"1rem"}
                      >
                        <FiUpload color="white" fontSize={"1.5rem"} />
                      </Box>
                      <Text ml={4} as="span">
                        Upload Cover Photo
                      </Text>
                    </FormLabel>
                    <input
                      style={{
                        opacity: 0,
                        position: "absolute",
                        zIndex: -1
                      }}
                      type="file"
                      id="uploadProfilePhoto"
                      onChange={handlePhotoFileChange}
                    />
                  </>
                )}
              </FormControl>
              <Box display={"flex"} justifyContent={"flex-end"} mt={4}>
                <Button colorScheme="facebook" onClick={props.onClose}>
                  Save
                </Button>
              </Box>
            </>
          )}
        </ModalBody>
        {/* <ModalFooter>
          <Button colorScheme="facebook" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
