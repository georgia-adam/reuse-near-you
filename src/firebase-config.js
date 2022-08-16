// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// import "firebase/storage";
// import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9tEcm-lZfGwQpJ7pMILbJvWb9z5rUu3Q",
  authDomain: "reuse-near-you.firebaseapp.com",
  projectId: "reuse-near-you",
  storageBucket: "reuse-near-you.appspot.com",
  messagingSenderId: "655349777772",
  appId: "1:655349777772:web:823eda006ac44c20895f49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
