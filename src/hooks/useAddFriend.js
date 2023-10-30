import { useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import useGetUserOtherInfo from "./useGetUserOtherInfo";

const useAddFriend = () => {
  const { user } = useAuth();
  const { userOtherInfo } = useGetUserOtherInfo();

  const addFriend = async (userUid, userPhotoURL, userFullName) => {
    const friendRef = doc(db, "friend-request", userUid);
    await setDoc(
      friendRef,
      {
        request: arrayUnion({
          status: "pending",
          from: user.uid,
          requesterPhotoURL: userPhotoURL,
          requesterFullName: userFullName,
          to: userUid,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      },
      { merge: true }
    );
    console.log("friend request sent");
  };

  const listFriendRequest = async (userId) => {
    const friendRef = doc(db, "friend-request", userId);
    const friendSnapshot = await getDoc(friendRef);
    const friendData = friendSnapshot.data();
    const friendRequest = friendData.request;
    const friendRequestData = friendRequest.map((request) => ({
      ...request,
      id: request.to
    }));

    return friendRequestData;
  };

  const confirmRequest = async (userUid) => {
    const friendRef = doc(db, "friend-request", userUid);

    // Update the friend request status
    const getFriendRequest = await getDoc(friendRef);
    const friendRequestData = getFriendRequest.data();
    const friendRequest = friendRequestData.request;
    const friendRequestIndex = friendRequest.findIndex((request) => {
      return request.from === user.uid;
    });

    friendRequest[friendRequestIndex + 1].status = "confirmed";
    friendRequest[friendRequestIndex + 1].updatedAt = new Date();

    await setDoc(
      friendRef,
      {
        request: friendRequest
      },
      { merge: true }
    );

    const fullName = friendRequest[friendRequestIndex + 1].requesterFullName;
    const profileImage =
      friendRequest[friendRequestIndex + 1].requesterPhotoURL;
    const friendIdto = friendRequest[friendRequestIndex + 1].to;
    const friendIdFrom = friendRequest[friendRequestIndex + 1].from;

    const friendFullname =
      userOtherInfo.firstName + " " + userOtherInfo.lastName;
    const friendProfileImage = user.photoURL;
    // Update the user's friends list
    const ownFriends = doc(db, "friends", user.uid);
    await setDoc(
      ownFriends,
      {
        friends: arrayUnion({
          friendId: friendIdFrom,
          friendFullname: fullName,
          friendProfileImage: profileImage,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      },
      { merge: true }
    );

    const friendFriends = doc(db, "friends", friendIdFrom);
    await setDoc(
      friendFriends,
      {
        friends: arrayUnion({
          friendId: friendIdto,
          friendFullname: friendFullname,
          friendProfileImage: friendProfileImage,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      },
      { merge: true }
    );

    console.log("Friend request confirmed");
    // console.log(friendRequestStatus);
  };

  const rejectRequest = async (userUid) => {
    const friendRef = doc(db, "friend-request", userUid);

    // Update the friend request status
    const getFriendRequest = await getDoc(friendRef);
    const friendRequestData = getFriendRequest.data();
    const friendRequest = friendRequestData.request;
    const friendRequestIndex = friendRequest.findIndex((request) => {
      return request.from === user.uid;
    });

    friendRequest[friendRequestIndex + 1].status = "rejected";
    friendRequest[friendRequestIndex + 1].updatedAt = new Date();

    if (friendRequest[friendRequestIndex + 1].status === "rejected") {
      friendRequest.splice(friendRequestIndex, 1);
    }
  };

  const removeFriend = async (userUid) => {
    const friendRef = doc(db, "friend-request", userUid);
    await deleteDoc(friendRef);
  };

  return {
    addFriend,
    listFriendRequest,
    confirmRequest,
    rejectRequest,
    removeFriend
  };
};

export default useAddFriend;
