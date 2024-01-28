import { useEffect, useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { auth, db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useDisclosure } from "@chakra-ui/react";
import useGetUserOtherInfo from "./useGetUserOtherInfo";

const useSharePost = (postId, isShared) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  const sharePost = async () => {
    setIsLoading(true);
    try {
      const id = uuid();
      const postRef = doc(db, "posts", postId);
      const sharedPostRef = doc(db, "shared-posts", id);

      await updateDoc(postRef, {
        shares: isShared ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });

      if (postId) {
        console.log("here");
        await setDoc(sharedPostRef, {
          id,
          postId,
          userId: user.uid,
          userImage: user.photoURL,
          userName: userOtherInfo?.firstName + " " + userOtherInfo?.lastName,
          createdAt: new Date()
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sharing post:", error);
      setIsLoading(false);
    }
  };

  return { sharePost, isLoading };
};

export default useSharePost;
