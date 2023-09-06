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

function Sidebar() {
  return (
    <>
      <Flex direction={"column"}>
        <SidebarItem
          to="/profile"
          icon={<Avatar src={Person1} border={"2px solid #0C71F5"} />}
          text={"Mary Jane Doe"}
        />
        <SidebarItem
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
