import { Box, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const ProfileLoader = () => {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Skeleton height={"550px"} width={"70%"} />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          w={"70%"}
        >
          <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
            <SkeletonCircle size={"100px"} />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              gap={"1rem"}
            >
              <Skeleton height={"20px"} width={"200px"} />
              <Skeleton height={"20px"} width={"150px"} />
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} gap={"1rem"}>
            <Skeleton height={"50px"} width={"200px"} />
            <Skeleton height={"50px"} width={"200px"} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileLoader;
