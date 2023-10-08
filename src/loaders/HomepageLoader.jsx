import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text
} from "@chakra-ui/react";
import Layout from "../pages/Layout";
import LoginModal from "../components/LoginModal/LoginModal";

const HomepageLoader = () => {
  return (
    <>
      <Layout webName="Paysbook" bgColor="#EDEDED" paddingY={5}>
        <LoginModal isOpen={true} onClose={() => {}} />
        <Grid templateColumns={"repeat(4, 1fr)"} gap={6}>
          <GridItem p={5}>
            <Skeleton height="40px" />
            <Skeleton height="40px" mt={2} />
            <Skeleton height="40px" mt={2} />
            <Skeleton height="40px" mt={2} />
            <Skeleton height="40px" mt={2} />
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <Skeleton height={"300px"} mt={5} />
            <Skeleton height={"300px"} mt={3} />
            <Skeleton height={"300px"} my={3} />
          </GridItem>
          <GridItem p={5} w="100%">
            <Box
              display={"flex"}
              w={"100%"}
              justifyContent={"space-between"}
              my={4}
              gap={4}
            >
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Events
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} color={"blue.600"}>
                See All
              </Text>
            </Box>
            <Skeleton height={"125px"} />
            <Skeleton height={"125px"} mt={2} />
            <Box
              display={"flex"}
              w={"100%"}
              justifyContent={"space-between"}
              my={4}
              gap={4}
            >
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Advertisement
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} color={"blue.600"}>
                Close
              </Text>
            </Box>
            <Skeleton height={"200px"} mt={2} />
            <Box
              display={"flex"}
              w={"100%"}
              justifyContent={"space-between"}
              mt={4}
              gap={4}
            >
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Chat
              </Text>
              <Text fontSize={"md"} fontWeight={"bold"} color={"blue.600"}>
                See All
              </Text>
            </Box>
            <Box
              display={"flex"}
              w={"100%"}
              mt={4}
              gap={4}
              alignItems={"center"}
            >
              <SkeletonCircle size="14" />
              <Skeleton width={"85%"} height={"30px"} />
            </Box>
            <Box
              display={"flex"}
              w={"100%"}
              mt={4}
              gap={4}
              alignItems={"center"}
            >
              <SkeletonCircle size="14" />
              <Skeleton width={"85%"} height={"30px"} />
            </Box>
            <Box
              display={"flex"}
              w={"100%"}
              mt={4}
              gap={4}
              alignItems={"center"}
            >
              <SkeletonCircle size="14" />
              <Skeleton width={"85%"} height={"30px"} />
            </Box>
            <Box
              display={"flex"}
              w={"100%"}
              mt={4}
              gap={4}
              alignItems={"center"}
            >
              <SkeletonCircle size="14" />
              <Skeleton width={"85%"} height={"30px"} />
            </Box>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default HomepageLoader;
