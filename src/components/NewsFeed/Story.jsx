import React, { useEffect } from "react";
import StoryItem from "./StoryItem";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Person1 from "../../assets/images/person-1.jpg";
import Person2 from "../../assets/images/person-2.jpg";
import Person2Place from "../../assets/images/person-2-place.jpg";
import Person3 from "../../assets/images/person-3.jpg";
import Person3Place from "../../assets/images/person-3-place.jpg";
import Person4 from "../../assets/images/person-4.jpg";
import Person4Place from "../../assets/images/person-4-place.jpg";
import Person5 from "../../assets/images/person-5.jpg";
import Person5Place from "../../assets/images/person-5-place.jpg";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useGetStories } from "../../hooks/useStories";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../main.css";

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

function Story() {
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
        w={"20%"}
        cursor={"pointer"}
        onClick={() => {
          window.location.href = "/stories/";
        }}
      >
        <StoryItem image={user.photoURL} name={"Your Story"} />
      </Box>

      <Box w={"80%"}>
        <Carousel
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 4
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2
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
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-50-px"
        >
          {getLatest.map((story, index) => {
            return (
              <GridItem
                key={story}
                w={"100%"}
                mr={2}
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

export default Story;
