import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpXqrxdnvJ_avJx2gOF44PwzzWJJm12pA",
  authDomain: "balainimeno-89c82.firebaseapp.com",
  projectId: "balainimeno-89c82",
  storageBucket: "balainimeno-89c82.appspot.com",
  messagingSenderId: "464087941460",
  appId: "1:464087941460:web:111e5bab2fb95921b548c1",
  measurementId: "G-JWDLKK3NMM"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);