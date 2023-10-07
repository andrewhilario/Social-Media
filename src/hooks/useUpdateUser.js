import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const useUpdateUser = ({ profilePhoto, coverPhoto, bio }) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, {
        coverPhoto,
        bio
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      const user = auth.currentUser;
      user.photoURL = profilePhoto;
    }
  });

  return { profilePhoto, coverPhoto, bio };
};

export default useUpdateUser;
