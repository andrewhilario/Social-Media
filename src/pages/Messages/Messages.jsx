/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  CloseButton,
  Flex,
  Heading,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import useFriends from "../../hooks/useFriends";
import useChat from "../../hooks/useChat";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { addDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdAttachFile } from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useAuth from "../../context/useAuth";

const Messages = () => {
  const { listAllFriends } = useFriends();
  const [friends, setFriends] = useState([]);
  const { user: authUser } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { addChat } = useChat();
  const { chatId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMessages] = useState(null);
  const [profile, setProfile] = useState([]);
  const [msgId, setMsgId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  // const [imageLink, setImageLink] = useState("");

  const toast = useToast();

  const fetchFriends = async () => {
    const list = await listAllFriends();
    setFriends(list);
  };

  const fetchMessage = async () => {
    const chatRef = doc(db, "chats", chatId);
    if (chatRef) {
      try {
        onSnapshot(chatRef, (doc) => {
          const { chatParticipant, messages } = doc.data();

          if (messages) {
            setMessages(messages);
          }
          console.log("chatParticipant", doc.data());
          if (
            chatParticipant &&
            chatParticipant?.length > 1 &&
            chatParticipant[1]
          ) {
            setFriendId(chatParticipant[1]?.id);
            // console.log("friend id", friendId);
          } else {
            console.log("Invalid chatParticipant data");
          }
        });
      } catch (error) {
        console.log("Error getting document:", error);
      }
    } else {
      console.log("No such document!");
    }
  };

  const upload = async () => {
    if (images.length > 0) {
      const storageRef = ref(storage, "images");
      const imageRef = ref(storageRef, images[0]?.name);
      const imageURL = await uploadBytes(imageRef, images[0]).then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
          return getDownloadURL(imageRef);
        }
      );
      return imageURL;
    } else {
      return "";
    }
  };

  const handleSendMessage = async (data) => {
    setLoading(true);
    setImages([]);
    setVideos([]);
    try {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);

      // upload images to firebase storage

      if (chatSnap.exists()) {
        const { chatParticipant, messages } = chatSnap.data();

        const imageLink = await upload();

        if (chatParticipant[0]?.id.includes(authUser.uid)) {
          if (!messages) {
            if (imageLink) {
              const newMessage = {
                id: authUser.uid,
                message: data.message,
                image: imageLink,
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };

              await setDoc(chatRef, {
                messages: [newMessage],
                chatParticipant: [...chatParticipant]
              });

              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });
              setLoading(false);
            } else {
              console.log("no image");
              setLoading(false);
            }
          } else {
            if (imageLink) {
              const newMessage = {
                id: authUser.uid,
                message: data.message,
                image: imageLink,
                // video: videoUrl,
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };

              if (chatSnap.data().messages) {
                await setDoc(
                  chatRef,
                  {
                    messages: [...messages, newMessage],
                    chatParticipant: [...chatParticipant]
                  },
                  { merge: true }
                );
              } else {
                await setDoc(chatRef, {
                  messages: [newMessage]
                });
              }

              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });
              setLoading(false);
            } else {
              const newMessage = {
                id: authUser.uid,
                message: data.message,
                image: "",
                // video: videoUrl,
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };

              if (chatSnap.data().messages) {
                await setDoc(
                  chatRef,
                  {
                    messages: [...messages, newMessage],
                    chatParticipant: [...chatParticipant]
                  },
                  { merge: true }
                );
              } else {
                await setDoc(chatRef, {
                  messages: [newMessage]
                });
              }

              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });
              setLoading(false);
            }
          }
        } else if (chatParticipant[1]?.id.includes(authUser.uid)) {
          if (!messages) {
            if (imageLink) {
              const friendMessage = {
                id: authUser.uid,
                message: data.message,
                image: imageLink,
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };
              await setDoc(chatRef, {
                messages: [friendMessage],
                chatParticipant: [...chatParticipant]
              });

              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });
              setLoading(false);
            } else {
              console.log("no image");
              setLoading(false);
            }
          } else {
            if (imageLink) {
              const friendMessage = {
                id: authUser.uid,
                message: data.message,
                image: imageLink,
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };

              if (chatSnap.data().messages) {
                await setDoc(
                  chatRef,
                  {
                    messages: [...messages, friendMessage]
                  },
                  { merge: true }
                );
              } else {
                await setDoc(chatRef, {
                  messages: [friendMessage],
                  chatParticipant: [...chatParticipant]
                });
              }
              // Scroll to bottom with new message
              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });

              setLoading(false);
            } else {
              const friendMessage = {
                id: authUser.uid,
                message: data.message,
                image: "",
                profileImage: authUser.photoURL,
                userFullname:
                  userOtherInfo.firstName + " " + userOtherInfo.lastName,
                timestamp: new Date()
              };

              if (chatSnap.data().messages) {
                await setDoc(
                  chatRef,
                  {
                    messages: [...messages, friendMessage]
                  },
                  { merge: true }
                );
              } else {
                await setDoc(chatRef, {
                  messages: [friendMessage],
                  chatParticipant: [...chatParticipant]
                });
              }
              // Scroll to bottom with new message
              const bottomMsg = document.getElementById("messageBox");
              bottomMsg.scrollIntoView({ behavior: "smooth" });

              setLoading(false);
            }
          }
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    document.getElementById("message").value = "";
  };

  const handleChange = (e) => {
    if (e.target.files) {
      const isImage = (file) => file.type.startsWith("image/");
      const isVideo = (file) => file.type.startsWith("video/");

      const validateSize = (file) => {
        const maxSizeImage = 10485760; // 10MB
        const maxSizeVideo = 20971520; // 20MB for videos

        if (isImage(file) && file.size > maxSizeImage) {
          toast({
            title: "Error",
            description: "You can only upload up to 10MB for images",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          return false;
        }

        if (isVideo(file) && file.size > maxSizeVideo) {
          toast({
            title: "Error",
            description: "You can only upload up to 20MB for videos",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          return false;
        }

        return true;
      };

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];

        if (isImage(file) && i >= 4) {
          toast({
            title: "Error",
            description: "You can only upload up to 4 images",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          return;
        }

        if (isVideo(file) && i >= 1) {
          toast({
            title: "Error",
            description: "You can only upload 1 video",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          return;
        }

        if (!validateSize(file)) {
          return;
        }

        setImages((prevImages) => prevImages.concat(file));
        setVideos((prevVideos) => prevVideos.concat(file));
      }
    }
  };

  const removeImage = (image) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
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

    return () => {};
  }, []);

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
                      // addChat([
                      //   {
                      //     id: authUser.uid,
                      //     fullname:
                      //       userOtherInfo.firstName +
                      //       " " +
                      //       userOtherInfo.lastName,
                      //     profileImage: authUser.photoURL
                      //   },
                      //   {
                      //     id: user.friendId,
                      //     fullname: user.friendFullname,
                      //     profileImage: user.friendProfileImage
                      //   }
                      // ]);
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
                base: "81vh",
                xl: "82vh"
              }}
              direction={"column"}
              overflowY={"scroll"}
              overflowX={"hidden"}
              css={`
                &::-webkit-scrollbar {
                  width: 5px;
                  padding-left: 5px;
                }
                &::-webkit-scrollbar-thumb {
                  border-radius: 100px;
                  background-color: #a4a4a4;
                }
              `}
            >
              {msg?.map((message, index) => {
                // if (message.id === friendId) {
                // console.log("friend id", friendId);
                return (
                  <Box
                    key={message.id}
                    display={"flex"}
                    alignSelf={
                      message.id === authUser.uid ? "flex-end" : "flex-start"
                    }
                    mt={5}
                  >
                    {/* {msgId} */}
                    <Flex
                      gap={"10px"}
                      align="flex-start"
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
                        marginBottom={"10px"}
                      >
                        {message.message ? (
                          <>
                            <Text
                              m={0}
                              color={
                                message.id === authUser.uid ? "#fff" : "#000"
                              }
                              pb={message.image ? "10px" : "0px"}
                            >
                              {message.message}
                            </Text>
                            {message.image === "" ? (
                              <></>
                            ) : (
                              <Image
                                key={index}
                                src={message.image}
                                height={"200px"}
                                width={"200px"}
                                objectFit={"cover"}
                                borderRadius={"10px"}
                              />
                            )}
                          </>
                        ) : (
                          //   );
                          // })
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            w={"200px"}
                            h={"300px"}
                          >
                            <video>
                              <source src={message.video} type="video/mp4" />
                            </video>
                          </Box>
                        )}
                      </Box>
                      <Avatar
                        mb={"15px"}
                        src={message.profileImage}
                        name={message.userFullname}
                      />
                    </Flex>
                  </Box>
                );
                // }
              })}
              <Box id="messageBox" pb={5} />
            </Flex>
            {/* Footer */}
            <Flex
              w={"100%"}
              px={5}
              py={3}
              direction={"column"}
              position={"relative"}
            >
              <Flex
                align={"center"}
                gap={"10px"}
                bg={"#dbdbdb"}
                w={"100%"}
                position={"absolute"}
                right={"0"}
                bottom={"100%"}
                padding={"20px"}
                borderRadius={"10px"}
                display={images.length > 0 ? "flex" : "none"}
              >
                {images.length > 0 &&
                  images.map((image, index) => {
                    return (
                      <Image
                        key={image.id}
                        // marginTop={"-50%"}
                        height={"200px"}
                        objectFit={"cover"}
                        w={{
                          base: "50%",
                          md: "40%",
                          lg: "25%",
                          xl: "10%"
                        }}
                        src={URL.createObjectURL(image)}
                      />
                    );
                  })}
                <CloseButton
                  position={"absolute"}
                  right={"0"}
                  top={"0"}
                  onClick={() => setImages([])}
                />
              </Flex>
              <Flex gap={"12px"} align={"center"} mt={"auto"} w={"100%"}>
                <Input
                  id="message"
                  placeholder={"Type a message"}
                  w={"90%"}
                  {...register("message", { required: true })}
                />

                <input
                  type="file"
                  id="file"
                  hidden
                  onChange={handleChange}
                  multiple
                  accept="image/*,video/*"
                />

                <label htmlFor="file">
                  <MdAttachFile size={30} />
                </label>

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
