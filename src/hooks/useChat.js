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

const useChat = () => {
  const addChat = async (participants) => {
    const id = uuid();
    const chatRef = doc(db, "chats", id);

    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      const chatData = chatSnap.data();
      const chatParticipants = chatData.participants;

      if (
        chatParticipants.includes(participants[0]) ||
        chatParticipants.includes(participants[1])
      ) {
        return;
      } else {
        await setDoc(
          chatRef,
          {
            id,
            participants,
            messages: []
          },
          { merge: true }
        );
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
