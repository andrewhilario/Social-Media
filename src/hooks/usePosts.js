import { useState } from "react";
import {
  collection,
  setDoc,
  doc,
  Timestamp,
  query,
  orderBy,
  where,
  getDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import { useToast } from "@chakra-ui/react";
import {
  useCollectionData,
  useDocumentData
} from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthContext";
import useGetUserOtherInfo from "./useGetUserOtherInfo";

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();
  const toast = useToast();

  async function createPost(post, images) {
    try {
      setIsLoading(true);
      if (post) {
        const postImages = JSON.stringify(images);

        const id = uuid();
        await setDoc(doc(db, "posts", id), {
          ...post,
          postImages,
          postId: id,
          authorId: user.uid,
          postUser: userOtherInfo?.firstName + " " + userOtherInfo?.lastName,
          postUserImage: user?.photoURL,
          createdAt: Timestamp.fromDate(new Date()),
          likes: [],
          comments: [],
          shares: []
        });
      }
      setIsLoading(false);
      toast({
        title: "Post created.",
        description: "Your post has been created.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "An error occurred.",
        description: "Unable to create your post.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  }

  return { createPost, isLoading };
}

export function usePosts() {
  const postQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );
  const [posts, isLoading, error] = useCollectionData(postQuery);

  if (error) {
    throw new Error(error);
  }

  return { posts, isLoading };
}

// export function usePost(postId) {
//   const postRef = doc(db, "posts", postId);

//   onSnapshot(postRef, (doc) => {
//     if (doc.exists()) {
//       doc.data();
//     } else {
//       return null;
//     }
//   });

//   return { postData };
// }

export const usePost = (postId) => {
  const postRef = doc(db, "posts", postId);
  const [postData, isLoading, error] = useDocumentData(postRef);

  if (error) {
    throw new Error(error);
  }

  return { postData, isLoading };
};
