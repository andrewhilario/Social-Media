import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import Reels1 from "../../../assets/videos/reels-video-1.mp4";

function ReelsVideoSM() {
  return (
    <>
      <ReactPlayer
        url={Reels1}
        playing={true}
        controls={true}
        width={"100%"}
        height={"100%"}
        style={{
          objectFit: "cover"
        }}
      />
    </>
  );
}

export default ReelsVideoSM;
