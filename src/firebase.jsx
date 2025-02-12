// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvYDMmdwUQPzbx_pxd0a1gst2-OL7EXaU",
  authDomain: "registerusers-e03f0.firebaseapp.com",
  projectId: "registerusers-e03f0",
  storageBucket: "registerusers-e03f0.firebasestorage.app",
  messagingSenderId: "398938743965",
  appId: "1:398938743965:web:19e21044fcd312e2b3a074",
  measurementId: "G-121TGGPPNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { db, auth };