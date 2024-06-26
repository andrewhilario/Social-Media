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
import useAuth from "../context/useAuth";

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

    if (chatParticipant[0].id === user.uid && userSnap.exists()) {
      const userChatData = userSnap.data();

      const existingChat = userChatData.chats.find((chat) => {
        return (
          chat.participant.id === chatParticipant[1].id &&
          chat.chatExist === true
        );
      });

      if (existingChat) {
        console.log("Chat exists");
        navigate(`/chat/${existingChat.id}`);
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
              participant: chatParticipant[1],
              chatExist: true
            })
          },
          { merge: true }
        );

        await setDoc(
          friendRef,
          {
            chats: arrayUnion({
              id,
              participant: chatParticipant[0],
              chatExist: true
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
