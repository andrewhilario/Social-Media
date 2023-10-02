import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import Reels1 from "../../../assets/videos/reels-video-1.mp4";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";

function ReelsVideoSM() {
  return (
    <>
      <Box
        w={{
          base: "100%"
        }}
        height={"100%"}
        margin={"0 auto"}
        position={"relative"}
        background={"black"}
      >
        <Flex
          pos={"absolute"}
          top={3}
          justify={"space-between"}
          w="100%"
          px={5}
          align={"center"}
        >
          <BiArrowBack fontSize={24} color={"white"} />
          <Flex>
            <Avatar w={8} h={8} />
          </Flex>
        </Flex>
        <ReactPlayer
          url={Reels1}
          playing={true}
          // controls={true}
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover"
          }}
        />
        <Flex
          direction={"column"}
          position={"absolute"}
          zIndex={2}
          bottom={0}
          right={0}
          w={"10%"}
          align={"center"}
          gap={5}
        >
          <Box>
            <AiOutlineLike fontSize={24} color={"white"} />
            <Text color={"white"} fontSize={12} mt={"15px"}>
              1.2k
            </Text>
          </Box>
          <Box>
            <FaRegCommentAlt fontSize={24} color={"white"} />
            <Text color={"white"} fontSize={12} mt={"15px"}>
              1.2k
            </Text>
          </Box>
          <Box>
            <PiShareFat fontSize={24} color={"white"} />
            <Text color={"white"} fontSize={12} mt={"15px"}>
              1.2k
            </Text>
          </Box>
          <HiDotsHorizontal fontSize={24} color={"white"} />
        </Flex>
      </Box>
    </>
  );
}

export default ReelsVideoSM;
