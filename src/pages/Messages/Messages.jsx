/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Layout from "../Layout";
import useFriends from "../../hooks/useFriends";
import { useAuth } from "../../context/AuthContext";
import useChat from "../../hooks/useChat";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ms } from "date-fns/locale";
import { set } from "date-fns";

const Messages = () => {
  const { listAllFriends } = useFriends();
  const [friends, setFriends] = React.useState([]);
  const { user: authUser } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { addChat } = useChat();
  const { chatId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMessages] = React.useState(null);
  const [profile, setProfile] = React.useState([]);
  const [msgId, setMsgId] = React.useState("");
  const [friendId, setFriendId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const fetchFriends = async () => {
    const list = await listAllFriends();
    setFriends(list);
  };

  const fetchMessage = async () => {
    const chatRef = doc(db, "chats", chatId);
    try {
      onSnapshot(chatRef, (doc) => {
        const { participants, messages } = doc.data();
        setMessages(messages);
        setFriendId(participants[1]?.id);
        // console.log("friend id", friendId);
      });
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  const handleSendMessage = async (data) => {
    setLoading(true);
    try {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);

      if (chatSnap.exists()) {
        const { participants, messages } = chatSnap.data();

        // console.log("friend Id", authUser.uid);
        if (participants[0]?.id.includes(authUser.uid)) {
          const newMessage = {
            id: authUser.uid,
            message: data.message,
            profileImage: authUser.photoURL,
            userFullname:
              userOtherInfo.firstName + " " + userOtherInfo.lastName,
            timestamp: new Date()
          };

          await setDoc(
            chatRef,
            {
              messages: [...messages, newMessage]
            },
            { merge: true }
          );
          setLoading(false);
          // console.log("New message added to chat.", newMessage);
        } else if (participants[1]?.id.includes(authUser.uid)) {
          const friendMessage = {
            id: authUser.uid,
            message: data.message,
            profileImage: authUser.photoURL,
            userFullname:
              userOtherInfo.firstName + " " + userOtherInfo.lastName,
            timestamp: new Date()
          };

          await setDoc(
            chatRef,
            {
              messages: [...messages, friendMessage]
            },
            { merge: true }
          );
          setLoading(false);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    document.getElementById("message").value = "";
  };

  useEffect(() => {
    if (chatId) {
      if (friends) {
        fetchFriends();
        fetchMessage();
      }
    } else {
      return navigate("/");
    }
  });

  return (
    <Layout>
      <Tabs orientation="vertical" variant={"unstyled"} h={"90vh"}>
        <TabList
          borderRight={"2px solid #f0f0f0"}
          px={"20px"}
          w={"17%"}
          alignItems={"start"}
          display={{
            base: "none",
            md: "none",
            lg: "none",
            xl: "block"
          }}
        >
          <Heading
            fontSize={24}
            fontWeight={"bold"}
            mb={"24px"}
            py={"12px"}
            display={{
              base: "none",
              md: "none",
              lg: "none",
              xl: "block"
            }}
          >
            Messages
          </Heading>
          {!friends ? (
            <Center h={"100%"} w={"100%"}>
              <CircularProgress isIndeterminate color="blue.300" />
            </Center>
          ) : (
            friends.map((user, index) => {
              if (user.friendId === authUser.uid) {
                <Tab
                  borderRadius={"10px"}
                  _hover={{
                    bg: "gray.100"
                  }}
                  display={{
                    base: "none",
                    md: "none",
                    lg: "none",
                    xl: "block"
                  }}
                  key={user.id}
                  onClick={() => {
                    addChat([
                      {
                        id: authUser.uid,
                        fullname:
                          userOtherInfo.firstName +
                          " " +
                          userOtherInfo.lastName,
                        profileImage: authUser.photoURL
                      },
                      {
                        id: user.friendId,
                        fullname: user.friendFullname,
                        profileImage: user.friendProfileImage
                      }
                    ]);
                  }}
                >
                  <Flex align={"center"} gap={"10px"}>
                    <Avatar
                      src={user.friendProfileImage}
                      name={user.friendFullname}
                      size={"sm"}
                    />
                    <Text m={0} fontSize={16} fontWeight={"medium"}>
                      {user.friendFullname}
                    </Text>
                  </Flex>
                </Tab>;
              } else {
                return (
                  <Tab
                    key={user.id}
                    borderRadius={"10px"}
                    _hover={{
                      bg: "gray.100"
                    }}
                    display={{
                      base: "none",
                      md: "none",
                      lg: "none",
                      xl: "block"
                    }}
                    onClick={() => {
                      addChat([
                        {
                          id: authUser.uid,
                          fullname:
                            userOtherInfo.firstName +
                            " " +
                            userOtherInfo.lastName,
                          profileImage: authUser.photoURL
                        },
                        {
                          id: user.friendId,
                          fullname: user.friendFullname,
                          profileImage: user.friendProfileImage
                        }
                      ]);
                    }}
                  >
                    <Flex align={"center"} gap={"10px"}>
                      <Avatar
                        src={user.friendProfileImage}
                        name={user.friendFullname}
                        size={"sm"}
                      />
                      <Text m={0} fontSize={16} fontWeight={"medium"}>
                        {user.friendFullname}
                      </Text>
                    </Flex>
                  </Tab>
                );
              }
            })
          )}
        </TabList>
        <TabPanels w={"80%"}>
          <TabPanel>
            <Flex
              h={{
                base: "87vh",
                xl: "82vh"
              }}
              direction={"column"}
            >
              {msg?.map((message, index) => {
                // if (message.id === friendId) {
                // console.log("friend id", friendId);
                return (
                  <Box
                    display={"flex"}
                    alignSelf={
                      message.id === authUser.uid ? "flex-end" : "flex-start"
                    }
                    mt={5}
                    key={index}
                  >
                    {msgId}
                    <Flex
                      gap={"10px"}
                      align="center"
                      direction={
                        message.id === authUser.uid ? "row" : "row-reverse"
                      }
                    >
                      <Box
                        w={"fit-content"}
                        bg={
                          message.id === authUser.uid ? "blue.500" : "#ededed"
                        }
                        p={"10px"}
                        borderRadius={"md"}
                      >
                        <Text
                          m={0}
                          color={message.id === authUser.uid ? "#fff" : "#000"}
                        >
                          {message.message}
                        </Text>
                      </Box>
                      <Avatar
                        src={message.profileImage}
                        name={message.userFullname}
                      />
                    </Flex>
                  </Box>
                );
                // }
              })}
              {/* <Box display={"flex"} alignSelf={"flex-start"} mt={5}>
                <Flex gap={"10px"} align="center" >
                  <Avatar />
                  <Box
                    w={"fit-content"}
                    bg={"#ededed"}
                    p={"10px"}
                    borderRadius={"md"}
                  >
                    <Text m={0}>Hello</Text>
                  </Box>
                </Flex>
              </Box> */}
            </Flex>
            {/* Footer */}
            <Flex gap={"12px"} align={"center"} mt={"auto"}>
              <Input
                id="message"
                placeholder={"Type a message"}
                w={"90%"}
                {...register("message", { required: true })}
              />
              <Button
                w={{
                  base: "fit-content",
                  md: "fit-content",
                  lg: "fit-content",
                  xl: "fit-content"
                }}
                bg={"blue.500"}
                color={"#fff"}
                borderRadius={"10px"}
                px={"20px"}
                py={"10px"}
                _hover={{
                  bg: "blue.600"
                }}
                loadingText="Sending..."
                isLoading={loading}
                onClick={handleSubmit(handleSendMessage)}
              >
                Send
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text>Content 2</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Messages;
