/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function getComment(postId) {
  const q = query(collection(db, "comments"), where("postId", "==", postId));
  const [comments, isLoading] = useCollectionData(q);

  return { comments, isLoading };
}
