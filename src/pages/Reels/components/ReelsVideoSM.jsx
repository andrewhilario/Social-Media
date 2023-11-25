/* eslint-disable react/jsx-key */
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Reels1 from "../../../assets/videos/reels-video-1.mp4";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  BiArrowBack,
  BiSolidVolumeFull,
  BiSolidVolumeMute
} from "react-icons/bi";
import { getAllReels } from "../../../hooks/useReels";
import { Carousel } from "react-responsive-carousel";
import { useAuth } from "../../../context/AuthContext";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";

function ReelsVideoSM() {
  const [playingStates, setPlayingStates] = useState({});
  const [mutedStates, setMutedStates] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();
  const playerRef = useRef(null);
  const { reels, isLoading } = getAllReels();
  const { user } = useAuth();

  useEffect(() => {
    const initialPlayingStates = {};
    const initialMutedStates = {};

    reels?.forEach((_, index) => {
      initialPlayingStates[index] = false;
      initialMutedStates[index] = false;
    });
    setPlayingStates(initialPlayingStates);
    setMutedStates(initialMutedStates);

    const element1 = document.querySelector(".slider-wrapper.axis-vertical");
    const element2 = document.querySelector(
      ".control-arrow.control-prev.control-disabled"
    );
    if (element1) {
      element1.style.height = "0";
    }

    if (element2) {
      element2.style = "display: none;";
    }

    // Optional: Return a cleanup function if needed
    // return () => {
    //   if (element1) {
    //     element1.style.display = ""; // Reset the display property
    //   }
    //   if (element2) {
    //     element2.style.display = ""; // Reset the display property
    //   }
    // };
  }, [reels]);

  const togglePlay = (index) => {
    setPlayingStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index]
    }));
  };

  // Function to handle mute/unmute toggle
  const toggleMute = (index) => {
    setMutedStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index]
    }));
  };

  const handleSlideChange = (newIndex) => {
    // Stop the previous video
    setPlayingStates((prevStates) => ({
      ...prevStates,
      [activeIndex]: false,
      [activeIndex]: playerRef.current.seekTo(0)
    }));

    // Start playing the new video
    setPlayingStates((prevStates) => ({
      ...prevStates,
      [newIndex]: true,
      [activeIndex]: playerRef.current.seekTo(0)
    }));

    // Update the active index
    setActiveIndex(newIndex);
  };
  return (
    <>
      <Flex
        pos={"fixed"}
        top={3}
        justify={"space-between"}
        w="100%"
        zIndex={1}
        px={5}
        align={"center"}
      >
        <BiArrowBack fontSize={24} color={"white"} />
        <Flex>
          <Avatar
            w={8}
            h={8}
            src={user?.photoURL}
            border={"solid 1px blue.600"}
          />
        </Flex>
      </Flex>

      <Carousel
        axis="vertical"
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        showArrows={false}
        onChange={handleSlideChange}
      >
        {reels?.map((reel, index) => {
          return (
            <Box
              key={index}
              w={{
                base: "100%"
              }}
              h={"100vh"}
              // marginTop={"-20px"}
              // marginTop={"-50px"}
              // marginBottom={"60px"}
              position={"relative"}
              background={"black"}
            >
              <Flex
                align={"center"}
                gap={5}
                position={"absolute"}
                zIndex={2}
                top={16}
                right={6}
                direction={"column"}
              >
                {playingStates[index] ? (
                  <BsPauseFill
                    fontSize={"24px"}
                    color="white"
                    onClick={() => togglePlay(index)}
                  />
                ) : (
                  <BsFillPlayFill
                    fontSize={"24px"}
                    color="white"
                    onClick={() => togglePlay(index)}
                  />
                )}
                {mutedStates[index] ? (
                  <BiSolidVolumeMute
                    fontSize={"24px"}
                    color="white"
                    onClick={() => toggleMute(index)}
                  />
                ) : (
                  <BiSolidVolumeFull
                    fontSize={"24px"}
                    color="white"
                    onClick={() => toggleMute(index)}
                  />
                )}
              </Flex>

              <ReactPlayer
                url={reel?.videoUrl}
                playing={playingStates[index]}
                volume={mutedStates[index] ? 0 : 1}
                muted={mutedStates[index]}
                width={"100%"}
                height={"100%"}
                style={{
                  objectFit: "cover"
                }}
                ref={playerRef}
                loop={true}
              />
              <Flex
                direction={"column"}
                position={"absolute"}
                zIndex={2}
                bottom={5}
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
              <Flex
                direction={"column"}
                position={"absolute"}
                zIndex={1}
                bottom={0}
                left={0}
                w={"95%"}
                p={5}
              >
                <Text mb={2} color={"white"} fontSize={14}>
                  {reel?.title}
                </Text>
                <Text mb={3} color={"white"} fontSize={12}>
                  {reel?.description}
                </Text>
                <Flex align={"center"} gap={2}>
                  <Avatar w={4} h={4} src={reel?.userProfilePhoto} />
                  <Text mb={0} color={"white"} fontSize={12}>
                    {reel?.userFullname}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}

export default ReelsVideoSM;
