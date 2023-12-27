/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export const useStories = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createStories = async (
    storyData,
    fileData,
    userId,
    userFullname,
    userProfilePhoto
  ) => {
    setLoading(true);

    try {
      let fileUrl = null;

      if (fileData) {
        const fileRef = ref(storage, `stories/${fileData.name}`);
        console.log(fileRef);
        await uploadBytes(fileRef, fileData);

        fileUrl = await getDownloadURL(fileRef);
      }

      const storiesRef = doc(db, "stories", userId);

      const newStory = {
        ...storyData,
        fileUrl,
        userId,
        userFullname,
        userProfilePhoto,
        uploadDate: new Date().toISOString()
      };

      if (fileUrl) {
        const docSnap = await getDoc(storiesRef);
        const currentData = docSnap.data();

        if (docSnap.exists()) {
          await setDoc(
            storiesRef,
            {
              stories: arrayUnion(newStory, ...currentData.stories)
            },
            { merge: true }
          );
        } else {
          await setDoc(storiesRef, {
            stories: arrayUnion(newStory)
          });
        }
      } else {
        const docSnap = await getDoc(storiesRef);
        const currentData = docSnap.data();

        console.log("currentData", currentData);

        await setDoc(
          storiesRef,
          {
            stories: arrayUnion(newStory, ...currentData.stories)
          },
          { merge: true }
        );
      }

      setLoading(false);
      console.log("Story successfully added!");
      // reload the page
      // window.location.reload();
    } catch (error) {
      console.log("Error adding document: ", error);
      // window.location.reload();
    }
  };

  return { createStories, loading, error };
};

export const useGetStories = () => {
  const { user } = useAuth();

  const storiesRef = collection(db, "stories");
  const [stories] = useCollectionData(storiesRef);

  // get the latest story

  let getLatest = [];
  let storyId = null;

  if (stories) {
    getLatest = stories.map((story) => {
      return story.stories[0];
    });

    if (getLatest.length > 0) {
      storyId = getLatest[0].userId;
    }
  }

  return { stories, getLatest, storyId };
};

export const useGetUsersStories = (storyId) => {
  const [userStory, setUserStory] = useState(null);

  useEffect(() => {
    const storiesRef = doc(db, "stories", storyId);
    const unsubscribe = onSnapshot(storiesRef, (doc) => {
      const data = doc.data();
      console.log("data", data);
      setUserStory(data);
    });
  }, [storyId]);

  return { userStory };
};
