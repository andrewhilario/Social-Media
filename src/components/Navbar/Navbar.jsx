/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Flex,
  Image,
  LinkBox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  transition,
  Icon,
  Link
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import LogoFC from "../Logo/Logo";
import Notification from "../../assets/svg/Notification.svg";
import Message from "../../assets/svg/Chat Bubble.svg";
import Watch from "../../assets/svg/TVShowWhite.svg";
import { SearchBar } from "../SearchBar";
import Person1 from "../../assets/images/person-1.jpg";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../../assets/images/default-avatar.jpg";
import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";

function Navbar({ websiteName, paddingVertical, logoMargin }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const { userOtherInfo } = useGetUserOtherInfo();

  const handleLogout = async () => {
    try {
      await logout("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user.photoURL) {
      setProfilePicture(user.photoURL);
    }
  }, []);

  return (
    <>
      <Flex
        bg="#0C71F5"
        px={{
          base: "5px",
          md: "10px",
          lg: "20px"
        }}
        py={paddingVertical}
        alignItems={"center"}
      >
        <Flex w={"50%"} alignItems={"center"} gap={5}>
          <LogoFC margin={logoMargin} websiteName={websiteName} />
          <LinkBox
            href={"/notifications"}
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"100%"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Link href={"/"}>
              <Image w={30} h={30} src={Notification} alt="notification" />
            </Link>
          </LinkBox>
          <LinkBox
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"100%"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Image w={30} h={30} src={Message} alt="notification" />
          </LinkBox>
          <LinkBox
            w={50}
            h={50}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"100%"}
            _hover={{
              borderRadius: "100%",
              bg: "#0149a8",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer"
            }}
          >
            <Image w={30} h={30} src={Watch} alt="notification" />
          </LinkBox>
        </Flex>
        <Flex
          w={"50%"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={10}
        >
          <SearchBar searchBarWidth={"400px"} />
          <Menu>
            <MenuButton>
              <Avatar
                name={userOtherInfo?.firstName + " " + userOtherInfo?.lastName}
                src={user?.photoURL}
              />
            </MenuButton>
            <MenuList py={"1.2rem"} px={".5rem"}>
              <MenuItem borderRadius={"10px"}>
                <Flex
                  onClick={() => {
                    navigate("/profile");
                  }}
                  align={"center"}
                >
                  <CgProfile mr={4} fontSize={"1.5rem"} />
                  <Text m={0} fontSize={"1.2rem"}>
                    Profile
                  </Text>
                </Flex>
              </MenuItem>
              <MenuItem borderRadius={"10px"}>
                <Flex onClick={handleLogout} align={"center"}>
                  <MdLogout mr={4} fontSize={"1.5rem"} />
                  <Text m={0} fontSize={"1.2rem"}>
                    Logout
                  </Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
