import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetUserInfoById = () => {
  const fetchUserInfo = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };
  return { fetchUserInfo };
};

export default useGetUserInfoById;
