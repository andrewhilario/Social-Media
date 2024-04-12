import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import useAddFriend from "../../hooks/useAddFriend";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import { useNavigate } from "react-router-dom";
import { BsCheckLg, BsTrash3 } from "react-icons/bs";
import useAuth from "../../context/useAuth";

const FriendRequests = () => {
  const { listFriendRequest, confirmRequest, removeFriend } = useAddFriend();
  const { user } = useAuth();
  const [friendRequests, setFriendRequests] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const navigate = useNavigate();
  const isSmallerScreen = useMediaQuery("(max-width: 425px)");

  if (user) {
    if (friendRequests.length === 0) {
      listFriendRequest(user.uid).then((res) => {
        setFriendRequests(res);
      });
    }
  }

  return (
    <>
      {!isSmallerScreen ? (
        <Layout>
          <Box w={"100%"} height={"100vh"} background={"#eaeaea"}>
            <Box
              w={"55%"}
              height={"100%"}
              p={4}
              margin={"0 auto"}
              background={"#fff"}
            >
              <Text fontSize={32} fontWeight={"bold"}>
                Friend Requests
              </Text>

              {friendRequests.length > 0 ? (
                friendRequests.map((friendRequest, index) => {
                  if (friendRequest.status === "pending") {
                    return (
                      <Flex
                        mt={4}
                        align={"center"}
                        justify={"space-between"}
                        px={3}
                        py={4}
                        background={"#ededed"}
                        alignItems={"center"}
                        borderRadius={"10px"}
                        key={index}
                      >
                        <Flex align={"center"} gap={4}>
                          <Avatar src={friendRequest.requesterPhotoURL} />
                          <Flex direction={"column"}>
                            <Text m={0} fontSize={20} fontWeight={"bold"}>
                              {friendRequest.requesterFullName}
                            </Text>
                          </Flex>
                        </Flex>

                        {accepted ? (
                          <>
                            <Flex align={"center"} gap={4}>
                              <Text
                                fontSize={20}
                                fontWeight={"bold"}
                                px={4}
                                py={2}
                                bg={
                                  rejected
                                    ? "red.500"
                                    : accepted
                                    ? "green.500"
                                    : "blue.500"
                                }
                                color={"#fff"}
                                borderRadius={"10px"}
                                mb={0}
                              >
                                {rejected
                                  ? "Request Declined"
                                  : "Request Accepted"}
                              </Text>
                            </Flex>
                          </>
                        ) : (
                          <>
                            <Flex align={"center"} gap={4}>
                              <Button
                                colorScheme={"blue"}
                                onClick={() => {
                                  confirmRequest(user.uid);
                                  setAccepted(true);
                                  setTimeout(() => {
                                    navigate("/");
                                  }, 2000);
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                colorScheme={"red"}
                                onClick={() => {
                                  removeFriend(user.uid);
                                  setRejected(true);
                                  window.location.reload();
                                }}
                              >
                                Decline
                              </Button>
                            </Flex>
                          </>
                        )}
                      </Flex>
                    );
                  }
                })
              ) : (
                <Text
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  mt={4}
                  color={"#c7c7c7"}
                >
                  No friend requests
                </Text>
              )}
            </Box>
          </Box>
        </Layout>
      ) : (
        <Box w={"100%"} height={"100vh"} background={"#eaeaea"}>
          <Box w={"100%"} height={"100%"} margin={"0 auto"} background={"#fff"}>
            {friendRequests.length > 0 ? (
              friendRequests.map((friendRequest, index) => {
                if (friendRequest.status === "pending") {
                  return (
                    <Flex
                      mt={4}
                      align={"center"}
                      justify={"space-between"}
                      px={3}
                      py={4}
                      background={"#ededed"}
                      alignItems={"center"}
                      borderRadius={"10px"}
                      key={index}
                    >
                      <Flex align={"center"} gap={4}>
                        <Avatar src={friendRequest.requesterPhotoURL} />
                        <Flex direction={"column"}>
                          <Text m={0} fontSize={20} fontWeight={"bold"}>
                            {friendRequest.requesterFullName}
                          </Text>
                        </Flex>
                      </Flex>

                      {accepted ? (
                        <>
                          <Flex align={"center"} gap={4}>
                            <Text
                              fontSize={14}
                              fontWeight={"bold"}
                              px={4}
                              py={2}
                              bg={
                                rejected
                                  ? "red.500"
                                  : accepted
                                  ? "green.500"
                                  : "blue.500"
                              }
                              color={"#fff"}
                              borderRadius={"10px"}
                              mb={0}
                            >
                              {rejected
                                ? "Request Declined"
                                : "Request Accepted"}
                            </Text>
                          </Flex>
                        </>
                      ) : (
                        <>
                          <Flex align={"center"} gap={2}>
                            <Button
                              colorScheme={"blue"}
                              onClick={() => {
                                confirmRequest(user.uid);
                                setAccepted(true);
                                setTimeout(() => {
                                  window.location.reload();
                                }, 2000);
                              }}
                            >
                              <BsCheckLg />
                            </Button>
                            <Button
                              colorScheme={"red"}
                              onClick={() => {
                                removeFriend(user.uid);
                                setRejected(true);
                                window.location.reload();
                              }}
                            >
                              <BsTrash3 />
                            </Button>
                          </Flex>
                        </>
                      )}
                    </Flex>
                  );
                }
              })
            ) : (
              <Text
                fontSize={20}
                fontWeight={"bold"}
                textAlign={"center"}
                mt={4}
                color={"#c7c7c7"}
              >
                No friend requests
              </Text>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default FriendRequests;
