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

function Sidebar() {
  return (
    <>
      <Flex direction={"column"}>
        <SidebarItem
          icon={
            <Avatar
              src="https://lh3.googleusercontent.com/a/AAcHTtdpp1SJUpO8wcx7ruPSU9DRNcy3IqVd_LyPEmpoQNULyb8=s288-c-no"
              border={"2px solid #0C71F5"}
            />
          }
          text={"John Doe"}
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
