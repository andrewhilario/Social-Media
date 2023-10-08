import {
  Button,
  Card,
  FormControl,
  Grid,
  GridItem,
  Input,
  Link as ChakraLink,
  Divider,
  Box,
  useDisclosure,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LogoFC from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/LoginComponents/Footer";
import CreateAccountModal from "../../components/LoginComponents/CreateAccountModal";
import Form from "../../components/Form/Form";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import { set, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const success = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (success) {
        toast({
          position: "top",
          title: "Login Success",
          description: "Welcome back to Paysbook",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        reset();
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast({
        position: "top",
        title: "Login Failed",
        description: "Invalid username or password",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      reset();
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Paysbook</title>
      </Helmet>
      <CreateAccountModal isOpenModal={isOpen} onCloseModal={onClose} />

      <Grid
        templateColumns={"repeat(2, 1fr)"}
        backgroundColor={"#F0F2F5"}
        height={"100vh"}
      >
        <GridItem
          colSpan={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* <Box bg={"white"} width={"100px"} height={"100px"}> */}
          <LogoFC
            websiteName={"paysbook"}
            subTitleWebsiteName={"Connect, Share and Earn"}
            color={"blue.500"}
            subColor={"#000"}
            margin={"0 auto"}
            mainTextFontSize={"7xl"}
            mainTextFontWeight={"bold"}
            subTextFontSize={"3xl"}
          />
          {/* </Box> */}
        </GridItem>
        <form
          onSubmit={handleSubmit(handleLogin)}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <GridItem
            width={"100%"}
            colSpan={1}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Card
              py={"3rem"}
              px={"2rem"}
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              width={"55%"}
            >
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  padding={"1.5rem"}
                  {...register("email", { required: true })}
                  {...(errors.email && { isInvalid: true })}
                />
                {errors.email && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Username is required
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  padding={"1.5rem"}
                  {...register("password", { required: true })}
                  {...(errors.password && { isInvalid: true })}
                />
                {errors.password && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Password is required
                  </Text>
                )}
              </FormControl>
              <Button
                isLoading={isLoading}
                loadingText="Logging in..."
                colorScheme="facebook"
                padding={"1.5rem"}
                type="submit"
              >
                Login
              </Button>
              <Link
                to="/"
                style={{
                  textAlign: "center"
                }}
              >
                <ChakraLink color="blue.500">Forgot password?</ChakraLink>
              </Link>
              <Divider backgroundColor={"#F0F2F5"} />
              <Button
                colorScheme="whatsapp"
                padding={"1.5rem"}
                onClick={onOpen}
              >
                Create New Account
              </Button>
            </Card>
          </GridItem>
        </form>
      </Grid>
      {/* <Footer /> */}
    </>
  );
}
