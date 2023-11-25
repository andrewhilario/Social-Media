/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  orderBy,
  query,
  updateDoc,
  arrayUnion,
  onSnapshot
} from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { auth, storage, db } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useReels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReel = async (
    reelData,
    videoFile,
    userId,
    userFullname,
    userProfilePhoto
  ) => {
    setLoading(true);
    setError(null);
    console.log("reelData", reelData);

    try {
      const videoRef = ref(storage, `reels/${videoFile.name}`);
      await uploadBytes(videoRef, videoFile);

      const videoUrl = await getDownloadURL(videoRef);

      const reelsRef = collection(db, "reels");
      const newReelRef = await addDoc(reelsRef, {
        ...reelData,
        reelId: newReelRef.id,
        videoUrl,
        likes: 0,
        comments: [],
        userId,
        userFullname,
        userProfilePhoto,
        uploadDate: new Date().toISOString()
      });

      setLoading(false);
      return newReelRef.id;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return { createReel, loading, error };
};

export const getAllReels = () => {
  const reelsQuery = query(collection(db, "reels"));

  const [reels, isLoading, error] = useCollectionData(reelsQuery, {
    idField: "id"
  });

  if (error) {
    throw new Error(error.message);
  }

  return { reels, isLoading };
};

export const likeReel = async (reelId, isLiked) => {
  const reelRef = doc(db, "reels", reelId);

  const reelSnapshot = await getDoc(reelRef);

  const reelData = reelSnapshot.data();

  if (!reelSnapshot.exists()) {
    throw new Error("No such document!");
  }

  await updateDoc(reelRef, {
    likes: isLiked ? reelData.likes - 1 : reelData.likes + 1
  });
};

export const commentReel = async (
  reelId,
  comment,
  userId,
  userFullName,
  userProfilePhoto
) => {
  const reelRef = doc(db, "reels", reelId);

  const reelSnapshot = await getDoc(reelRef);

  const reelData = reelSnapshot.data();

  if (!reelSnapshot.exists()) {
    throw new Error("No such document!");
  }

  await updateDoc(reelRef, {
    comments: arrayUnion({
      comment,
      userId: userId,
      userFullname: userFullName,
      userProfilePhoto: userProfilePhoto,
      uploadDate: new Date().toISOString()
    })
  });
};

export const getCommentReel = async (reelId) => {
  const reelRef = doc(db, "reels", reelId);

  const reelSnapshot = onSnapshot(reelRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      return {
        comments: data.comments || [] // Ensure you return an empty array if no comments
      };
    } else {
      console.log("No such document!");
      return { comments: [] }; // Return an empty array if the document doesn't exist
    }
  });

  return reelSnapshot;
};
