/* eslint-disable react/no-unknown-property */
import { AspectRatio, Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Reels1 from "../../../assets/videos/reels-video-1.mp4";
import { MdOutlinePublic } from "react-icons/md";
import { GoDotFill, GoUnmute } from "react-icons/go";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import {
  BiDotsHorizontalRounded,
  BiSolidVolumeFull,
  BiSolidVolumeMute
} from "react-icons/bi";
import ReactPlayer from "react-player";

import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";

function ReelsVideo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  return (
    <>
      <Box w="25%" margin={"0 auto"} position={"relative"} my={5}>
        <Flex
          position={"absolute"}
          p={5}
          zIndex={1}
          justifyContent={"space-between"}
          w="100%"
        >
          <Flex align={"center"}>
            <Avatar />
            <Box>
              <Flex align={"center"} ml={3}>
                <Text
                  w="100%"
                  color={"white"}
                  fontSize={14}
                  _hover={{ textDecoration: "underline" }}
                >
                  John Doe
                </Text>
                <GoDotFill color={"white"} fontSize={12} />
                <Text ml={3} fontSize={14} color={"white"}>
                  Following
                </Text>
              </Flex>
              <Flex align={"center"} ml={3}>
                <MdOutlinePublic color={"white"} fontSize={12} />
                <Text ml={2} fontSize={12} color={"white"}>
                  Public
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex align={"center"} gap={5}>
            {isPlaying ? (
              <BsPauseFill
                fontSize={"24px"}
                color="white"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <BsFillPlayFill
                fontSize={"24px"}
                color="white"
                onClick={() => setIsPlaying(true)}
              />
            )}
            {isMuted ? (
              <BiSolidVolumeMute
                fontSize={"24px"}
                color="white"
                onClick={() => setIsMuted(false)}
              />
            ) : (
              <BiSolidVolumeFull
                fontSize={"24px"}
                color="white"
                onClick={() => setIsMuted(true)}
              />
            )}
            <BiDotsHorizontalRounded fontSize={"24px"} color="white" />
          </Flex>
        </Flex>
        <Box w="100%" h="100%" borderRadius={15}>
          <ReactPlayer
            url={Reels1}
            playing={isPlaying}
            volume={isMuted ? 0 : 1}
            muted={isMuted}
            width="100%"
            height="100%"
            style={{ borderRadius: 15, overflow: "hidden" }}
          />
        </Box>

        <Flex
          direction={"column"}
          position={"absolute"}
          right={-100}
          bottom={0}
          p={5}
          zIndex={1}
          gap={5}
        >
          <Box>
            <Box
              borderRadius={"100%"}
              cursor={"pointer"}
              p={3}
              bg={"#6a6a6a"}
              _hover={{
                background: "#4a4a4a",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <AiFillLike color="white" fontSize={24} />
            </Box>
            <Text
              color={"white"}
              fontSize={12}
              mt={2}
              align={"center"}
              fontWeight={"bold"}
            >
              10
            </Text>
          </Box>
          <Box>
            <Box
              borderRadius={"100%"}
              p={3}
              bg={"#6a6a6a"}
              _hover={{
                background: "#4a4a4a",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <FaComment color="white" fontSize={24} />
            </Box>
            <Text
              color={"white"}
              fontSize={12}
              mt={2}
              align={"center"}
              fontWeight={"bold"}
            >
              3
            </Text>
          </Box>
          <Box>
            <Box
              borderRadius={"100%"}
              p={3}
              bg={"#6a6a6a"}
              _hover={{
                background: "#4a4a4a",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <FaShare color="white" fontSize={24} />
            </Box>
            <Text
              color={"white"}
              fontSize={12}
              mt={2}
              align={"center"}
              fontWeight={"bold"}
            >
              2
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default ReelsVideo;
