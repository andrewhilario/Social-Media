/* eslint-disable react/prop-types */
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Text,
  Link
} from "@chakra-ui/react";
import LogoFC from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>
            <LogoFC
              websiteName={"UM Connect"}
              color={"blue.600"}
              mainTextFontSize={"6xl"}
              mainTextFontWeight={"bold"}
            />
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading textAlign={"center"} size={"lg"} color={"blue.600"}>
              Welcome to UM Connect!
            </Heading>
            <Text textAlign={"center"} mt={5}>
              Here you can connect with your friends and family. You can also
              earn by liking, sharing, and commenting on posts.
            </Text>
            <Text
              fontSize={"1.5rem"}
              textAlign={"center"}
              my={7}
              color={"blue.600"}
            >
              Sign up now and start earning!
            </Text>
            <Button
              w={"200px"}
              colorScheme="facebook"
              mb={"15px"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign up
            </Button>
            <Text mb={"25px"}>
              Already have an account?{" "}
              <Link href="/login" color={"blue.600"}>
                Log in
              </Link>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
