import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useGetSharePost() {
  const sharePostQuery = query(collection(db, "shared-posts"));

  const [sharePost, isLoading, error] = useCollectionData(sharePostQuery);

  if (isLoading) {
    return { sharePost: [], isLoading: true };
  }

  if (error) {
    throw new Error(error);
  }

  return { sharePost, isLoading: false };
}
