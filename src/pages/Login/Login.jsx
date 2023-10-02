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
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import LogoFC from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import Footer from "../../components/LoginComponents/Footer";
import CreateAccountModal from "../../components/LoginComponents/CreateAccountModal";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <GridItem
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
                placeholder="Email or phone number"
                padding={"1.5rem"}
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="Password"
                padding={"1.5rem"}
              />
            </FormControl>
            <Button colorScheme="facebook" padding={"1.5rem"}>
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
            <Button colorScheme="whatsapp" padding={"1.5rem"} onClick={onOpen}>
              Create New Account
            </Button>
          </Card>
        </GridItem>
      </Grid>
      {/* <Footer /> */}
    </>
  );
}
