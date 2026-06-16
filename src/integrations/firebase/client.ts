import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARTPBgUeEMVz3RPjdEZprPTKZlH26XQlI",
  authDomain: "nextpass-90043.firebaseapp.com",
  projectId: "nextpass-90043",
  storageBucket: "nextpass-90043.firebasestorage.app",
  messagingSenderId: "543923213597",
  appId: "1:543923213597:web:ad0f3f8c51f9d1c9c7fdf4",
  measurementId: "G-3MBD0FNYFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
