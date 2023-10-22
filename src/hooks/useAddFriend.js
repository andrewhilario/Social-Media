import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const useAddFriend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addFriend = async (friendEmail) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get the authenticated user's ID
      const auth = getAuth();
      const userId = auth.currentUser.uid;

      // Check if the friend email exists in the users collection
      const usersRef = collection(db, "users");
      const querySnapshot = await usersRef
        .where("email", "==", friendEmail)
        .get();

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      // Get the friend's ID
      const friendId = querySnapshot.docs[0].id;

      // Add the friend to the user's friends collection
      const friendsRef = collection(db, "users", userId, "friends");
      await addDoc(friendsRef, { friendId });

      // Send a friend request to the added user
      const friendRequestsRef = collection(
        db,
        "users",
        friendId,
        "friendRequests"
      );
      await setDoc(doc(friendRequestsRef, userId), { status: "pending" });

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { addFriend, isLoading, error, success };
};

export default useAddFriend;
