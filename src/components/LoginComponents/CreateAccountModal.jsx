/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  FormControl,
  Text,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  useToast
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  updatePhoneNumber
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm, Controller, get, set } from "react-hook-form";
import { getAuth } from "firebase/auth";

export default function CreateAccountModal({ isOpenModal, onCloseModal }) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (data) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;
      const fullName = `${data.firstName} ${data.lastName}`;
      user.displayName = fullName;
      user.phoneNumber = data.mobileNumber;

      await setDoc(doc(db, "users", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        gender: data.gender,
        // username: data.username,
        // userUid: user.uid,
        coverPhoto: "",
        bio: ""
      });

      toast({
        position: "top",
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 1500,
        isClosable: true
      });
      setIsLoading(false);

      // on Success clear all the input fields
      reset();
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Sign Up
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider borderColor={"gray.600"} />
          <ModalBody pb={6} mt={4}>
            <form onSubmit={handleSubmit(handleRegistration)}>
              <FormControl>
                <Box
                  display={"grid"}
                  gridTemplateColumns={"1fr 1fr"}
                  gap={"1rem"}
                >
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...register("firstName", { required: true })}
                      {...(errors.firstName && { isInvalid: true })}
                    />
                    {errors.firstName && (
                      <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                        First name is required.
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...register("lastName", { required: true })}
                      {...(errors.lastName && { isInvalid: true })}
                    />
                    {errors.firstName && (
                      <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                        Last name is required.
                      </Text>
                    )}
                  </FormControl>
                </Box>
              </FormControl>

              <FormControl mt={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  {...(errors.email && { isInvalid: true })}
                />
                {errors.email && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Email is required
                  </Text>
                )}
              </FormControl>
              {/* <FormControl mt={4}>
                <Input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true })}
                  {...(errors.username && { isInvalid: true })}
                />
                {errors.email && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Username is required
                  </Text>
                )}
              </FormControl> */}
              <FormControl mt={4}>
                <Input
                  type="number"
                  placeholder="Mobile Number"
                  {...register("mobileNumber", { required: true })}
                  {...(errors.mobileNumber && { isInvalid: true })}
                />
                {errors.mobileNumber && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Mobile Number is required
                  </Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <Input
                  type="password"
                  placeholder="New Password"
                  {...register("password", { required: true })}
                  {...(errors.password && { isInvalid: true })}
                />
                {errors.password && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Password is required
                  </Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <Input
                  type="text"
                  placeholder="Birthday"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  {...register("birthday", { required: true })}
                  {...(errors.birthday && { isInvalid: true })}
                />
                {errors.birthday && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Birthday is required
                  </Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("gender", value);
                      }}
                      value={getValues("gender")}
                      display={"grid"}
                      gridTemplateColumns={"1fr 1fr"}
                      gap={"1rem"}
                    >
                      <Box
                        padding={"10px"}
                        border={
                          errors.gender ? "1px solid red" : "1px solid #edf2f7"
                        }
                        borderRadius={"5px"}
                      >
                        <Radio
                          value="male"
                          {...(errors.gender && { isInvalid: true })}
                        >
                          Male
                        </Radio>
                      </Box>
                      <Box
                        padding={"10px"}
                        border={
                          errors.gender ? "1px solid red" : "1px solid #edf2f7"
                        }
                        borderRadius={"5px"}
                      >
                        <Radio
                          value="female"
                          {...(errors.gender && { isInvalid: true })}
                        >
                          Female
                        </Radio>
                      </Box>
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Text color={"red.500"} fontSize={"xs"} mt={"5px"}>
                    Gender is required
                  </Text>
                )}
              </FormControl>
              <Text fontSize={"12px"} mt={4}>
                People who use our service may have uploaded your contact
                information to Paysbook.{" "}
                <Link color={"blue.500"}>Learn more.</Link>
              </Text>
              <Text fontSize={"12px"} mt={4}>
                By clicking Sign Up, you agree to our <Link>Terms</Link>,{" "}
                <Link color={"blue.500"}>Privacy Policy</Link> and{" "}
                <Link color={"blue.500"}> Cookies Policy</Link>.
              </Text>
              <FormControl mt={6} display={"flex"} justifyContent={"center"}>
                <Button
                  isLoading={isLoading}
                  loadingText="Signing up..."
                  width={"70%"}
                  colorScheme="whatsapp"
                  type="submit"
                >
                  <Text fontSize={"1rem"} fontWeight={"bold"}>
                    Sign Up
                  </Text>
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
