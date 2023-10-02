import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { MdArrowDropDown } from "react-icons/md";

export default function CreateAccountModal({ isOpenModal, onCloseModal }) {
  const [value, setValue] = React.useState("1");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    birthday: "",
    gender: "",
    email: "",
    password: ""
  });

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
            <FormControl
              display={"grid"}
              gridTemplateColumns={"1fr 1fr"}
              gap={"1rem"}
            >
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
            </FormControl>

            <FormControl mt={4}>
              <Input type="email" placeholder="email" />
            </FormControl>
            <FormControl mt={4}>
              <Input type="number" placeholder="Mobile Number" />
            </FormControl>
            <FormControl mt={4}>
              <Input placeholder="New Password" />
            </FormControl>

            <FormControl mt={4}>
              <Input
                type="text"
                placeholder="Birthday"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </FormControl>
            <FormControl mt={4}>
              <RadioGroup
                onChange={setValue}
                value={value}
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                gap={"1rem"}
              >
                <Box
                  padding={"10px"}
                  border={"1px solid #edf2f7"}
                  borderRadius={"5px"}
                >
                  <Radio value="male">Male</Radio>
                </Box>
                <Box
                  padding={"10px"}
                  border={"1px solid #edf2f7"}
                  borderRadius={"5px"}
                >
                  <Radio value="female">Female</Radio>
                </Box>
              </RadioGroup>
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
              <Button width={"70%"} colorScheme="whatsapp">
                <Text>Sign Up</Text>
              </Button>
            </FormControl>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onCloseModal}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
