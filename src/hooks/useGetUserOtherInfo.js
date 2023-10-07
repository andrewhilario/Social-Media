import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const useGetUserOtherInfo = () => {
  const [userOtherInfo, setUserOtherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authChanged = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          await getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                setUserOtherInfo(doc?.data());
                setIsLoading(false);
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
      });
    };
    authChanged();
  }, []);

  return { userOtherInfo, isLoading };
};

export default useGetUserOtherInfo;
