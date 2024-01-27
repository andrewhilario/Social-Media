import React from "react";
import { db } from "../firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const addChat = async (participants) => {
    const id = uuid();
    const chatRef = doc(db, "chats", id);
    const userRef = doc(db, "users", user.uid);
    const friendRef = doc(db, "users", participants.participants[1].id);
    const userSnap = await getDoc(userRef);
    const chatParticipant = participants.participants;

    // console.log(participants[0].id, user.uid);
    if (chatParticipant[0].id === user.uid) {
      console.log("here");
      if (userSnap.data().chats) {
        if (userSnap.data().chats.length > 0) {
          userSnap.data().chats.forEach(async (chat) => {
            if (chat.participant.id === chatParticipant[1].id) {
              navigate(`/chat/${chat.id}`);
            }
          });
        } else {
          await setDoc(
            chatRef,
            {
              id,
              chatParticipant,
              messages: []
            },
            { merge: true }
          );
          await setDoc(
            userRef,
            {
              chats: arrayUnion({
                id,
                participant: chatParticipant[1]
              })
            },
            { merge: true }
          );

          await setDoc(
            friendRef,
            {
              chats: arrayUnion({
                id,
                participant: chatParticipant[0]
              })
            },
            { merge: true }
          );
          navigate(`/chat/${id}`);
        }
      } else {
        await setDoc(
          chatRef,
          {
            id,
            chatParticipant,
            messages: []
          },
          { merge: true }
        );
        await setDoc(
          userRef,
          {
            chats: arrayUnion({
              id,
              participant: chatParticipant[1]
            })
          },
          { merge: true }
        );

        await setDoc(
          friendRef,
          {
            chats: arrayUnion({
              id,
              participant: chatParticipant[0]
            })
          },
          { merge: true }
        );
        navigate(`/chat/${id}`);
      }
    }
  };

  const addMessages = async (chatId, message) => {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    const chat = chatSnap.data();

    await setDoc(
      chatRef,
      {
        messages: [
          ...chat.messages,
          {
            ...message,
            timestamp: new Date()
          }
        ]
      },
      { merge: true }
    );
  };

  return { addChat, addMessages };
};

export default useChat;
