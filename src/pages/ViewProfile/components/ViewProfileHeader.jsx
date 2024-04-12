/* eslint-disable react/prop-types */
import { AddIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  background,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import coverPhoto from "../../../assets/images/cover-photo.jpg";
import ProfilePost from "../../Profile/components/ProfilePost";
import { FiEdit } from "react-icons/fi";

import useGetUserOtherInfo from "../../../hooks/useGetUserOtherInfo";

import ProfileLoader from "../../../loaders/ProfileLoader";
import { useNavigate, useParams } from "react-router-dom";
import { BiUserPlus } from "react-icons/bi";
import UpdateProfileModal from "../../Profile/components/UpdateProfileModal";
import { usePosts } from "../../../hooks/usePosts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { RiUserSharedLine } from "react-icons/ri";
import useAddFriend from "../../../hooks/useAddFriend";
import useAuth from "../../../context/useAuth";

function ViewProfileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userOtherInfo, isLoading } = useGetUserOtherInfo();
  const { user } = useAuth();
  const { posts } = usePosts();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  //friend
  const [friendAdded, setFriendAdded] = useState(false);
  const { addFriend } = useAddFriend();
  // Params
  const { uid } = useParams();

  if (user?.uid === uid) {
    navigate("/profile");
  }

  function getProfile() {
    if (uid) {
      const docRef = doc(db, "users", uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        } else {
          console.log("No such document!");
        }
      });
    }
  }

  const handleAddFriend = () => {
    const fullName = userOtherInfo?.firstName + " " + userOtherInfo?.lastName;
    const photoURL = user.photoURL;
    setFriendAdded(!friendAdded);
    addFriend(uid, photoURL, fullName);
  };

  useEffect(() => {
    getProfile();
    // console.log(userData);
  }, []);

  return (
    <>
      {isLoading ? (
        <ProfileLoader />
      ) : (
        <>
          <Box w={"100%"} backgroundColor={"white"}>
            <UpdateProfileModal isOpen={isOpen} onClose={onClose} />
            <Box
              backgroundImage={`url(${userData?.coverPhoto})`}
              backgroundColor={"gray.200"}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              border={"3px solid #EDEDED"}
              w={{
                base: "100%",
                md: "90%",
                lg: "70%"
              }}
              h={{
                base: "300px",
                md: "450px",
                lg: "550px"
              }}
              mx={"auto"}
              borderRadius={"0 0 15px 15px"}
            ></Box>
            <Flex
              w={{
                base: "95%",
                md: "90%",
                lg: "70%"
              }}
              mx={"auto"}
              justifyContent={"space-between"}
              py={4}
              position={"relative"}
              direction={{
                base: "column",
                md: "column",
                lg: "row"
              }}
            >
              <Flex
                direction={{
                  base: "column",
                  md: "column",
                  lg: "row"
                }}
              >
                <Box
                  position={"absolute"}
                  top={{
                    base: "-100px",
                    md: "-100px",
                    lg: "-70px"
                  }}
                  left={{
                    base: "10px",
                    md: "25px"
                  }}
                  borderRadius={"full"}
                  border={"5px solid #EDEDED"}
                >
                  <Avatar
                    name={userData?.firstName + " " + userData?.lastName}
                    src={userData?.profileImage}
                    w={"150px"}
                    h={"150px"}
                  />
                </Box>
                <Flex
                  marginTop={{
                    base: "50px",
                    md: "60px",
                    lg: "0"
                  }}
                  marginBottom={{
                    base: "15px",
                    md: "20px",
                    lg: "0"
                  }}
                  marginLeft={{
                    base: "0",
                    md: "0",
                    lg: "200px"
                  }}
                  direction={"column"}
                >
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    {userData?.firstName + " " + userData?.lastName}
                  </Text>
                  {/* 
                    this will be added later
                  <Text fontSize={"md"} fontWeight={"medium"}>
                    {props.friends} Friends
                  </Text> */}
                </Flex>
              </Flex>

              <Flex gap={5}>
                <Button
                  bg="#0C71F5"
                  color={"white"}
                  _hover={{
                    bg: "#0C71F5"
                  }}
                  onClick={handleAddFriend}
                >
                  {friendAdded ? (
                    <>
                      <RiUserSharedLine
                        fontSize={"1.5rem"}
                        style={{
                          marginRight: "5px"
                        }}
                      />
                      Friend Request Sent
                    </>
                  ) : (
                    <>
                      <BiUserPlus
                        fontSize={"1.5rem"}
                        style={{
                          marginRight: "5px"
                        }}
                      />
                      Add Friend
                    </>
                  )}
                </Button>
                <Button
                  bg="#0C71F5"
                  color={"white"}
                  _hover={{
                    bg: "#0C71F5"
                  }}
                >
                  <ChevronDownIcon />
                </Button>
              </Flex>
            </Flex>
            <Divider
              variant="thick"
              w={{
                base: "100%",
                md: "90%",
                lg: "70%"
              }}
              mx={"auto"}
              py={3}
            />
          </Box>
        </>
      )}
      <Tabs position="relative" variant="unstyled" w="100%" mx={"auto"} pt={5}>
        <Box background={"white"} w="100%" mx={"auto"}>
          <TabList
            w={{
              base: "100%",
              md: "90%",
              lg: "70%"
            }}
            mx={"auto"}
          >
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Posts</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>About</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Friends</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Photos</Text>
            </Tab>
            <Tab
              py={5}
              _hover={{
                bg: "#d2d2d2"
              }}
              my={1}
              borderRadius={7}
            >
              <Text>Reels</Text>
            </Tab>
          </TabList>
        </Box>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels
          style={{
            width: "100%",
            background: "#EDEDED"
          }}
          mx={"auto"}
          marginTop={"25px"}
        >
          <Box
            w={{
              base: "100%",
              md: "90%",
              lg: "70%"
            }}
            mx={"auto"}
          >
            <TabPanel>
              <ProfilePost />
            </TabPanel>
          </Box>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              <Text>About</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Friends</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Photos</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="70%" mx={"auto"}>
              {" "}
              <Text>Reels</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default ViewProfileHeader;
