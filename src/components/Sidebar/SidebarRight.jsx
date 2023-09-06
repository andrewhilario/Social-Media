import { Box, Card, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import Event from "./components/Event";
import Advertisement from "./components/Advertisement";
import Chat from "./components/Chat";

function SidebarRight() {
  return (
    <>
      <Box p={5} bg={"white"} borderRadius={5}>
        <Event />
        <Advertisement />
        <Chat />
      </Box>
    </>
  );
}

export default SidebarRight;
