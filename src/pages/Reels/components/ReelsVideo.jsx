/* eslint-disable react/no-unknown-property */
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { CCarousel, CCarouselItem } from "@coreui/react";
import { getAllReels, getCommentReel, likeReel } from "../../../hooks/useReels";
import ReelComments from "./ReelComments.jsx";

function ReelsVideo() {
  const [playingStates, setPlayingStates] = useState({});
  const [mutedStates, setMutedStates] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();
  const playerRef = useRef(null);
  const { reels, isLoading } = getAllReels();
  const [isLiked, setIsLiked] = useState(false);
  const [currentReelId, setCurrentReelId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const initialPlayingStates = {};
    const initialMutedStates = {};
    reels?.forEach((_, index) => {
      initialPlayingStates[index] = false;
      initialMutedStates[index] = false;
    });
    setPlayingStates(initialPlayingStates);
    setMutedStates(initialMutedStates);
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

  const handleLike = (reelId) => {
    setIsLiked(!isLiked);
    likeReel(reelId, isLiked);
  };

  const openModalWithReelId = (reelId) => {
    setCurrentReelId(reelId); // Set the current reelId
    onOpen(); // Open the modal
  };

  return (
    <>
      <Button
        as={Link}
        to="/reels/create"
        position={"fixed"}
        top={"10%"}
        right={"2%"}
        zIndex={2}
        colorScheme="facebook"
        borderRadius={"full"}
        p={"24px"}
      >
        <MdAdd fontSize={24} style={{ marginRight: "4px" }} />
        <Text color={"white"} fontSize={18} fontWeight={"bold"} mb={0}>
          Create Reel
        </Text>
      </Button>

      <CCarousel
        controls
        transition="slide"
        wrap={false}
        interval={false}
        onSlide={handleSlideChange} // Handle slide change
        ref={carouselRef} // Ref for the carousel component
      >
        {isLoading ? (
          <Center h="90vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          reels?.map((reel, index) => {
            return (
              <CCarouselItem key={reel.reelId}>
                <Box w="25%" margin={"0 auto"} position={"relative"} my={5}>
                  <Flex
                    position={"absolute"}
                    p={5}
                    zIndex={1}
                    justifyContent={"space-between"}
                    w="100%"
                  >
                    <Flex align={"center"}>
                      <Avatar
                        src={reel.userProfilePhoto}
                        name={reel.userFullname}
                        size={"sm"}
                        mr={3}
                      />
                      <Box>
                        <Flex align={"center"} ml={3}>
                          <Text
                            w="100%"
                            color={"white"}
                            fontSize={14}
                            _hover={{ textDecoration: "underline" }}
                            mb={0}
                          >
                            {reel.userFullname}
                          </Text>
                          <GoDotFill color={"white"} fontSize={12} />
                          <Text ml={3} fontSize={14} color={"white"} mb={0}>
                            Following
                          </Text>
                        </Flex>
                        <Flex align={"center"} ml={3}>
                          <MdOutlinePublic color={"white"} fontSize={12} />
                          <Text ml={2} fontSize={12} color={"white"} mb={0}>
                            Public
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                    <Flex align={"center"} gap={5}>
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
                      <BiDotsHorizontalRounded
                        fontSize={"24px"}
                        color="white"
                      />
                    </Flex>
                  </Flex>
                  <Box w="100%" h="100%" borderRadius={15}>
                    <ReactPlayer
                      url={reel.videoUrl}
                      playing={playingStates[index]}
                      volume={mutedStates[index] ? 0 : 1}
                      muted={mutedStates[index]}
                      loop={true}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: 15, overflow: "hidden" }}
                      ref={playerRef}
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
                        onClick={() => {
                          handleLike(reel.reelId);
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
                        mb={0}
                      >
                        {reel.likes}
                      </Text>
                    </Box>

                    <Box>
                      <ReelComments
                        isOpenModal={isOpen}
                        onCloseModal={onClose}
                        reelId={currentReelId}
                      />
                      <Box
                        borderRadius={"100%"}
                        p={3}
                        bg={"#6a6a6a"}
                        _hover={{
                          background: "#4a4a4a",
                          transition: "all 0.3s ease-in-out"
                        }}
                        onClick={() => {
                          openModalWithReelId(reel.reelId);
                          console.log(reel.reelId);
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
                        mb={0}
                      >
                        {reel.comments?.length}
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
                        mb={0}
                      >
                        2
                      </Text>
                    </Box>
                  </Flex>

                  <Flex
                    position={"absolute"}
                    p={5}
                    bottom={0}
                    zIndex={1}
                    justifyContent={"space-between"}
                    w="100%"
                    direction={"column"}
                  >
                    <Text mb={0} color={"white"} fontSize={16}>
                      {reel.title}
                    </Text>
                    <Text
                      fontWeight={"normal"}
                      mb={0}
                      color={"white"}
                      fontSize={12}
                    >
                      {reel.description}
                    </Text>
                  </Flex>
                </Box>
              </CCarouselItem>
            );
          })
        )}
      </CCarousel>
    </>
  );
}

export default ReelsVideo;
