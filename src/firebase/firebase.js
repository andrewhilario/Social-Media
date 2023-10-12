import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMey203nIlWeaNES9bt6wG7MQy9O5ZREg",
  authDomain: "paysbook-social.firebaseapp.com",
  projectId: "paysbook-social",
  storageBucket: "paysbook-social.appspot.com",
  messagingSenderId: "240526928699",
  appId: "1:240526928699:web:d1154f43b7d44a4623e51e"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCOtLqyC3TBquSYo5DzAghhSRtzqgDcvAo",
//   authDomain: "paysbook-backend.firebaseapp.com",
//   projectId: "paysbook-backend",
//   storageBucket: "paysbook-backend.appspot.com",
//   messagingSenderId: "927173840597",
//   appId: "1:927173840597:web:f1ef06e8962d5d52c7dc5c"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);

export { auth, db, app, storage, realtimeDb };
