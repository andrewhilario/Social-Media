import React, { useEffect } from "react";
import StoryItem from "../StoryItem";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Person1 from "../../../assets/images/person-1.jpg";
import Person2 from "../../../assets/images/person-2.jpg";
import Person2Place from "../../../assets/images/person-2-place.jpg";
import Person3 from "../../../assets/images/person-3.jpg";
import Person3Place from "../../../assets/images/person-3-place.jpg";
import Person4 from "../../../assets/images/person-4.jpg";
import Person4Place from "../../../assets/images/person-4-place.jpg";
import Person5 from "../../../assets/images/person-5.jpg";
import Person5Place from "../../../assets/images/person-5-place.jpg";

import { useGetStories } from "../../../hooks/useStories";
import Carousel from "react-multi-carousel";
import useAuth from "../../../context/useAuth";

const Person_2 = {
  name: "Joanna Doe",
  profileSrc: Person2,
  backgroundImg: Person2Place
};
const Person_3 = {
  name: "Michael T.",
  profileSrc: Person3,
  backgroundImg: Person3Place
};
const Person_4 = {
  //Give me name
  name: "Amaris F.",
  profileSrc: Person4,
  backgroundImg: Person4Place
};
const Person_5 = {
  name: "Teddy Dillan",
  profileSrc: Person5,
  backgroundImg: Person5Place
};

function StorySM() {
  const { user } = useAuth();
  const { getLatest, storyId } = useGetStories();

  useEffect(() => {
    console.log("fetching stories", getLatest ? getLatest : "no stories");

    return () => {};
  }, []);

  return (
    <Flex
      w={{
        base: "90vw",
        md: "95vw",
        lg: "90%"
      }}
      mx={"auto"}
      gap={2}
      my={2}
    >
      <Box
        w={{
          base: "33%",
          md: "25%",
          lg: "20%"
        }}
        cursor={"pointer"}
        onClick={() => {
          window.location.href = "/stories/";
        }}
      >
        <StoryItem image={user.photoURL} name={"Your Story"} />
      </Box>
      <Box
        w={{
          base: "67%",
          md: "75%",
          lg: "80%"
        }}
      >
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 4
            },
            smallerMobile: {
              breakpoint: {
                max: 0,
                min: 340
              },
              items: 1
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 2
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 4
            }
          }}
          swipeable={false}
          draggable={false}
          ssr={false} // means to render carousel on server-side.
          infinite={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5 ease"
          transitionDuration={100}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-50-px"
        >
          {getLatest.map((story, index) => {
            return (
              <GridItem
                w={"100%"}
                mr={2}
                key={story.storyId}
                cursor={"pointer"}
                onClick={() => {
                  window.location.href = "/stories/" + story.userId;
                }}
              >
                <StoryItem
                  image={story.fileUrl}
                  name={story.userFullname}
                  profileSrc={story.userProfilePhoto}
                  isLoggedIn={true}
                />
              </GridItem>
            );
          })}
        </Carousel>
      </Box>
    </Flex>
  );
}

export default StorySM;
