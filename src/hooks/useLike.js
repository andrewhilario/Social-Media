import { useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useLike = (postId, userId, isLiked) => {
  const toggleLike = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { toggleLike };
};

export const useSharePostLike = (sharedPostId, userId, isLiked) => {
  const toggleLikeShared = async () => {
    try {
      const postRef = doc(db, "shared-posts", sharedPostId);
      console.log("sharedPostId", sharedPostId);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { toggleLikeShared };
};

export default useLike;
