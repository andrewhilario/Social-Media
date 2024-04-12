/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useGetUserOtherInfo from "./useGetUserOtherInfo";
import useAuth from "../context/useAuth";

const useComment = () => {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  const addComment = async (postId, comment) => {
    try {
      const id = Math.random().toString(36).substring(7);
      const date = new Date();
      const postRef = doc(db, "comments", id);
      await setDoc(postRef, {
        postId: postId,
        commentId: id,
        comment: comment,
        createdAt: date,
        commentAuthorName:
          userOtherInfo?.firstName + " " + userOtherInfo?.lastName,
        commentAuthorImage: user?.photoURL,
        commentAuthorId: user.uid
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (postId, comment) => {
    try {
      const postRef = doc(db, "comments", postId);
      await updateDoc(postRef, {
        comment: comment
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (postId, comment) => {
    try {
      const postRef = doc(db, "comments", postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.log(error);
    }
  };

  return { addComment, updateComment, deleteComment };
};

export default useComment;
