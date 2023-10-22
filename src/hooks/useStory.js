import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const useStory = () => {
  const [story, setStory] = useState("");

  const createStory = async (newStory) => {
    try {
      const storyRef = await addDoc(collection(db, "stories"), {
        content: newStory,
        createdAt: serverTimestamp()
      });
      setStory(storyRef.id);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return [story, createStory];
};

export default useStory;
