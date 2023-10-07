import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOtLqyC3TBquSYo5DzAghhSRtzqgDcvAo",
  authDomain: "paysbook-backend.firebaseapp.com",
  projectId: "paysbook-backend",
  storageBucket: "paysbook-backend.appspot.com",
  messagingSenderId: "927173840597",
  appId: "1:927173840597:web:f1ef06e8962d5d52c7dc5c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, app, storage };
