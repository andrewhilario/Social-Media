import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { HiUsers, HiUserGroup } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import Watch from "../../assets/svg/TV Show.svg";
import Reels from "../../assets/svg/Reels.svg";
import Person1 from "../../assets/images/person-1.jpg";

import useGetUserOtherInfo from "../../hooks/useGetUserOtherInfo";
import useAuth from "../../context/useAuth";

function Sidebar() {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  return (
    <>
      <Flex direction={"column"}>
        <SidebarItem
          to="/profile"
          icon={<Avatar src={user?.photoURL} border={"2px solid #0C71F5"} />}
          text={
            <Text m={0} fontWeight={"semibold"}>
              {userOtherInfo?.firstName + " " + userOtherInfo?.lastName}
            </Text>
          }
        />
        <SidebarItem
          to="/friend-requests"
          icon={<HiUsers color="#0C71F5" fontSize={32} />}
          text={"Friends"}
        />
        <SidebarItem
          icon={<HiUserGroup color="#0C71F5" fontSize={32} />}
          text={"Group"}
        />
        <SidebarItem
          icon={<FaShoppingCart color="#0C71F5" fontSize={32} />}
          text={"Marketplace"}
        />
        <SidebarItem
          icon={<Image src={Watch} w="32px" h="32px" />}
          text={"Watch"}
        />
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Text>See More</Text>
            </AccordionButton>
            <AccordionPanel p="0">
              <SidebarItem
                to="/reels"
                icon={<Image src={Reels} w="32px" h="32px" />}
                text={"Reels"}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  );
}

export default Sidebar;
