/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Stories, { WithSeeMore } from "react-insta-stories";
import Layout from "../Layout";
import { useParams } from "react-router-dom";
import { useGetStories, useGetUsersStories } from "../../hooks/useStories";
import { useAuth } from "../../context/AuthContext";
import { formatDistance } from "date-fns";
import { useMemo } from "react";

const ViewStories = () => {
  const { user } = useAuth();
  const { storyId } = useParams();
  const { userStory } = useGetUsersStories(storyId);

  const stories = userStory?.stories;

  const storyImages = stories?.map((story) => {
    return {
      url: story.fileUrl,
      header: {
        heading: story.userFullname,
        subheading: formatDistance(new Date(story.uploadDate), new Date()),
        profileImage: story.userProfilePhoto
      }
    };
  });

  useEffect(() => {
    console.log("stories", stories);
  }, [storyImages]);

  return (
    <Layout webName={"UM Connect Stories"}>
      <Box w={"100%"} height="90vh" bg={"#e7e7e7"}>
        <Flex
          align={"center"}
          justify={"center"}
          w={{
            base: "90%",
            md: "90%",
            lg: "25%"
          }}
          m={"0 auto"}
          zIndex={2}
        >
          {/* <CustomStoryContent story={stories} /> */}
          <Stories
            stories={
              storyImages
                ? storyImages
                : [
                    {
                      content: ({ action, isPaused }) => {
                        return (
                          <Box>
                            <Text>Hello</Text>
                          </Box>
                        );
                      }
                    }
                  ]
            }
            defaultInterval={1500}
            width={"100%"}
            height={"90vh"}
          />
        </Flex>
      </Box>
    </Layout>
  );
};

export default ViewStories;
