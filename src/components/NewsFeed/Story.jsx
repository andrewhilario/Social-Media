import React from "react";
import StoryItem from "./StoryItem";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
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

  return (
    <>
      <Grid
        w="90%"
        margin={"0 auto"}
        templateColumns="repeat(5, 1fr)"
        gap={2}
        py={4}
      >
        <GridItem w={"100%"}>
          <StoryItem image={user.photoURL} name={"Your Story"} />
        </GridItem>
        <GridItem w={"100%"}>
          <StoryItem
            image={Person_2.backgroundImg}
            name={Person_2.name}
            profileSrc={Person_2.profileSrc}
            isLoggedIn={true}
          />
        </GridItem>
        <GridItem w={"100%"}>
          <StoryItem
            image={Person_3.backgroundImg}
            name={Person_3.name}
            profileSrc={Person_3.profileSrc}
            isLoggedIn={true}
          />
        </GridItem>
        <GridItem w={"100%"}>
          <StoryItem
            image={Person_4.backgroundImg}
            name={Person_4.name}
            profileSrc={Person_4.profileSrc}
            isLoggedIn={true}
          />
        </GridItem>
        <GridItem w={"100%"}>
          <StoryItem
            image={Person_5.backgroundImg}
            name={Person_5.name}
            profileSrc={Person_5.profileSrc}
            isLoggedIn={true}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default Story;
