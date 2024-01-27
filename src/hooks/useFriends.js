import { useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";

const useFriends = () => {
  const { user } = useAuth();

  const listAllFriends = async () => {
    const friendsRef = doc(db, "friends", user?.uid);
    const friendsSnap = await getDoc(friendsRef);
    const friends = friendsSnap.data().friends;

    if (!friends) return [];

    return friends;
  };
  return { listAllFriends };
};

export default useFriends;
