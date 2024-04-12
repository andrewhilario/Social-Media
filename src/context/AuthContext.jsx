/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { app as firebaseApp, auth } from "../firebase/firebase";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Persist user session using localStorage
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      },
      {
        persistence: localStorage
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (email, password, redirectTo) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (redirectTo) => {
    try {
      await signOut(auth);
      navigate(redirectTo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
