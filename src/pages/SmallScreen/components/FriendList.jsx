import {
  Avatar,
  Box,
  Center,
  CircularProgress,
  Flex,
  Text
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useFriends from "../../../hooks/useFriends";
import { useAuth } from "../../../context/AuthContext";
import useChat from "../../../hooks/useChat";
import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  const { listAllFriends } = useFriends();
  const [friends, setFriends] = React.useState([]);
  const { user: authUser } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { addChat } = useChat();
  const navigate = useNavigate();

  const fetchFriends = async () => {
    const list = await listAllFriends();
    setFriends(list);
  };

  const getChatId = async (friendId, friendFullname, friendProfileImage) => {
    const chatId = userOtherInfo.chats;
    console.log("chats", chatId);
    chatId.map((chat) => {
      if (chat.participant.id === friendId) {
        navigate(`/chat/${chat.id}`);
      } else if (chat.participant.id !== friendId) {
        addChat({
          participants: [
            {
              id: authUser.uid,
              fullname: userOtherInfo.firstName + " " + userOtherInfo.lastName,
              profileImage: authUser.photoURL
            },
            {
              id: friendId,
              fullname: friendFullname,
              profileImage: friendProfileImage
            }
          ]
        });
      }
    });
  };

  useEffect(() => {
    if (authUser) {
      if (friends) {
        fetchFriends();
      }
    } else {
      return window.location.reload;
    }
  });
  return (
    <Box>
      {!friends ? (
        <Center h={"100%"} w={"100%"}>
          <CircularProgress isIndeterminate color="blue.300" />
        </Center>
      ) : (
        friends.map((user, index) => {
          if (user.friendId === authUser.uid) {
            <Flex
              align={"center"}
              gap={"10px"}
              margin={"10px 20px"}
              key={user.id}
              onClick={() => {
                let existingChatFound = false;

                userOtherInfo.chats.some((chat) => {
                  if (
                    chat.participant.id === user.friendId &&
                    chat.chatExist === true
                  ) {
                    console.log(
                      "Chat already exists. Navigating to existing chat."
                    );
                    navigate(`/chat/${chat.id}`);
                    // Set the flag to true to indicate an existing chat is found
                    existingChatFound = true;
                    // Exit the loop once a matching chat is found
                    return true;
                  }
                  return false; // Not necessary, but it explicitly indicates to continue the loop
                });

                // Check the flag before creating a new chat
                if (!existingChatFound) {
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
              <Avatar
                src={user.friendProfileImage}
                name={user.friendFullname}
                size={"sm"}
              />
              <Text m={0} fontSize={16} fontWeight={"medium"}>
                {user.friendFullname}
              </Text>
            </Flex>;
          } else {
            return (
              <Flex
                align={"center"}
                gap={"10px"}
                key={user.id}
                margin={"10px 0"}
                onClick={() => {
                  let existingChatFound = false;

                  userOtherInfo.chats.some((chat) => {
                    if (
                      chat.participant.id === user.friendId &&
                      chat.chatExist === true
                    ) {
                      console.log(
                        "Chat already exists. Navigating to existing chat."
                      );
                      navigate(`/chat/${chat.id}`);
                      // Set the flag to true to indicate an existing chat is found
                      existingChatFound = true;
                      // Exit the loop once a matching chat is found
                      return true;
                    }
                    return false; // Not necessary, but it explicitly indicates to continue the loop
                  });

                  // Check the flag before creating a new chat
                  if (!existingChatFound) {
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
                <Avatar
                  src={user.friendProfileImage}
                  name={user.friendFullname}
                  size={"sm"}
                />
                <Text m={0} fontSize={16} fontWeight={"medium"}>
                  {user.friendFullname}
                </Text>
              </Flex>
            );
          }
        })
      )}
    </Box>
  );
};

export default FriendList;
