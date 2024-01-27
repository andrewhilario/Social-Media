/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  CircularProgress,
  Flex,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { USERS } from "../../../constant/users";
import useFriends from "../../../hooks/useFriends";
import { useAuth } from "../../../context/AuthContext";
import { set } from "date-fns";
import { list } from "firebase/storage";
import { fr } from "date-fns/locale";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ChatBubble from "../../ChatBubble/ChatBubble";
import useChat from "../../../hooks/useChat";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { listAllFriends } = useFriends();
  const { user: authUser } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { addChat } = useChat();
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onClose, setOnClose] = useState(false);

  const fetchFriends = async () => {
    const list = await listAllFriends();
    setFriends(list);
  };

  const getChatId = async (friendId) => {
    const chatId = userOtherInfo.chats;
    chatId.map((chat) => {
      if (chat.participant.id === friendId) {
        console.log("chatId", chat.id);
        navigate(`/chat/${chat.id}`);
      }
    });
  };

  useEffect(() => {
    if (friends) {
      setIsLoading(false);
      fetchFriends();
    }
  }, []);

  // console.log("AuthUser", authUser.uid);

  return (
    <>
      <Flex justifyContent={"space-between"} align={"center"}>
        <Text m={0} fontWeight={"bold"} fontSize={24} mb={4}>
          Chat
        </Text>
        {/* <Text m={0} fontSize={14} color={"blue.600"}>
          Hide Chat
        </Text> */}
      </Flex>
      {/* <ChatBubble onClose={onClose} setOnClose={setOnClose} /> */}
      {!friends ? (
        <>
          <Center mt={4}>
            {isLoading ? (
              <CircularProgress isIndeterminate color="blue.300" />
            ) : (
              <Text m={0} fontSize={20} fontWeight={"bold"}>
                No friends yet
              </Text>
            )}
          </Center>
        </>
      ) : (
        friends.map((user, index) => {
          // if (user.friendId === authUser.uid) {
          return (
            <Flex
              align={"center"}
              justify={"space-between"}
              px={3}
              py={2}
              _hover={{
                background: "#ededed"
              }}
              alignItems={"center"}
              borderRadius={"10px"}
              key={index}
              cursor={"pointer"}
              onClick={() => {
                if (userOtherInfo.chats) {
                  console.log(`Friend ID ${index + 1}`, user.friendId);
                  getChatId(user.friendId);
                } else {
                  console.log("chatId", userOtherInfo.chats);
                  addChat({
                    participants: [
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
                    ]
                  });
                }
              }}
            >
              <Flex align={"center"} gap={4}>
                <Avatar
                  src={user.friendProfileImage}
                  name={user.friendFullname}
                />
                <Flex direction={"column"}>
                  <Text m={0} fontSize={20} fontWeight={"bold"}>
                    {user.friendFullname}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
          // } else {
          //   console.log("True");
          //   return (
          //     <Flex
          //       align={"center"}
          //       justify={"space-between"}
          //       px={3}
          //       py={2}
          //       _hover={{
          //         background: "#ededed"
          //       }}
          //       alignItems={"center"}
          //       borderRadius={"10px"}
          //       key={index}
          //       cursor={"pointer"}
          //       onClick={() => {
          //         if (userOtherInfo.chats) {
          //           console.log("Friend ID 2", user.friendId);
          //           getChatId(user.friendId);

          //           console.log("chatId", userOtherInfo.chats);
          //         } else {
          //           addChat({
          //             participants: [
          //               {
          //                 id: authUser.uid,
          //                 fullname:
          //                   userOtherInfo.firstName +
          //                   " " +
          //                   userOtherInfo.lastName,
          //                 profileImage: authUser.photoURL
          //               },
          //               {
          //                 id: user.friendId,
          //                 fullname: user.friendFullname,
          //                 profileImage: user.friendProfileImage
          //               }
          //             ]
          //           });
          //         }
          //       }}
          //     >
          //       <Flex align={"center"} gap={4}>
          //         <Avatar
          //           src={user.friendProfileImage}
          //           name={user.friendFullname}
          //         />
          //         <Flex direction={"column"}>
          //           <Text m={0} fontSize={20} fontWeight={"bold"}>
          //             {user.friendFullname}
          //           </Text>
          //         </Flex>
          //       </Flex>
          //     </Flex>
          //   );
          // }
        })
      )}
    </>
  );
}

export default Chat;
