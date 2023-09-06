import React from "react";
import Story from "./Story";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Person1 from "../../assets/images/person-1.jpg";
import Person4 from "../../assets/images/person-4.jpg";
import Person4Selfie from "../../assets/images/person-4-selfie.jpg";

function NewsFeed() {
  return (
    <>
      <Story />
      <CreatePost name="Mary Jane Doe" />
      <Post name="Mary Jane Doe" profileImg={Person1} />
      <Post name="Amaris Felliz" profileImg={Person4} postImg={Person4Selfie} />
    </>
  );
}

export default NewsFeed;
