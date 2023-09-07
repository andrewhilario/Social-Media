import React from "react";
import CreatePostSM from "./components/CreatePostSM";
import Story from "../Story";
import StorySM from "./StorySM";
import PostSM from "./PostSM";
import Person1 from "../../../assets/images/person-1.jpg";
import Person4 from "../../../assets/images/person-4.jpg";
import Person4Selfie from "../../../assets/images/person-4-selfie.jpg";

function NewsFeedSM() {
  return (
    <>
      <CreatePostSM />
      <StorySM />
      <PostSM name="Mary Jane Doe" profileImg={Person1} />
      <PostSM
        name="Amaris Felliz"
        profileImg={Person4}
        postImg={Person4Selfie}
      />
    </>
  );
}

export default NewsFeedSM;
