/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import React, { Children } from "react";

function SidebarItem(SidebarItemProps) {
  return (
    <>
      <Flex
        gap={3}
        alignItems={"center"}
        px={3}
        py={3}
        borderRadius={10}
        _hover={{
          background: "#afafaf",
          transition: "0.3s ease-in-out"
        }}
      >
        {SidebarItemProps.icon}
        {SidebarItemProps.text}
      </Flex>
    </>
  );
}

export default SidebarItem;
