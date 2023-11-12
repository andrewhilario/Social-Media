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

const FriendList = () => {
  const { listAllFriends } = useFriends();
  const [friends, setFriends] = React.useState([]);
  const { user: authUser } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const { addChat } = useChat();

  const fetchFriends = async () => {
    const list = await listAllFriends();
    setFriends(list);
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
                addChat([
                  {
                    id: authUser.uid,
                    fullname:
                      userOtherInfo.firstName + " " + userOtherInfo.lastName,
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
                  addChat([
                    {
                      id: authUser.uid,
                      fullname:
                        userOtherInfo.firstName + " " + userOtherInfo.lastName,
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
