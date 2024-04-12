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
  Text,
  Box,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { CloseIcon } from "@chakra-ui/icons";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { auth, db, storage } from "../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useAuth from "../../../context/useAuth";

function EditModal(props) {
  const [photoFile, setPhotoFile] = useState(null);
  const [image, setImage] = useState(null);
  const { userOtherInfo, isLoading } = useGetUserOtherInfo();
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  const handlePhotoFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
        if (e.target.files[0].size > 5_242_880) {
          toast({
            title: "File size is too large. Max size is 5MB.",
            status: "error",
            duration: 1000,
            isClosable: true
          });
          return;
        } else {
          setPhotoFile(URL.createObjectURL(e.target.files[0]));
          setImage(e.target.files[0]);
        }
      } else {
        toast({
          title: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
          status: "error",
          duration: 1000,
          isClosable: true
        });
        setPhotoFile(null);
        setIsUploading(false);
      }
    } else {
      console.log("No file selected");
    }
  };
  // Handle profile photo change
  const handleProfileChange = () => {
    try {
      setIsUploading(true);
      if (photoFile) {
        const imageRef = ref(
          storage,
          "images/" + user.uid + "/profileImage/" + image.name
        );
        uploadBytes(imageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, { profileImage: url }, { merge: true });
            toast({
              title: "Profile photo updated.",
              status: "success",
              duration: 1000,
              isClosable: true
            });
            setIsUploading(false);
            setPhotoFile(null);
            props.onClose();
          });
        });
      } else {
        setIsUploading(false);
        setPhotoFile(null);
        toast({
          title: "No photo selected.",
          status: "error",
          duration: 1000,
          isClosable: true
        });
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };
  // Handle cover photo change
  const handleCoverChange = () => {
    try {
      setIsUploading(true);
      if (photoFile) {
        const imageRef = ref(
          storage,
          "images/" + user.uid + "/coverPhoto/" + image.name
        );
        uploadBytes(imageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, { coverPhoto: url }, { merge: true });

            setIsUploading(false);
            toast({
              title: "Cover photo updated.",
              status: "success",
              duration: 1000,
              isClosable: true
            });
            setPhotoFile(null);
            props.onClose();
          });
        });
      } else {
        setIsUploading(false);
        setPhotoFile(null);
        toast({
          title: "No photo selected.",
          status: "error",
          duration: 1000,
          isClosable: true
        });
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
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
                        <CloseIcon color={"gray.700"} fontSize={"12px"} />
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
                        <CloseIcon color={"gray.700"} fontSize={"12px"} />
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
                <Button
                  isLoading={isUploading}
                  loadingText="Uploading"
                  colorScheme="facebook"
                  onClick={handleCoverChange}
                >
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
