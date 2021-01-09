import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyALsi5BR0pfDRsw6AH_mZE4ofjU7dT4dAk",
  authDomain: "schlagwort-bingo.firebaseapp.com",
  projectId: "schlagwort-bingo",
  storageBucket: "schlagwort-bingo.appspot.com",
  messagingSenderId: "587860346161",
  appId: "1:587860346161:web:95fc1b769e7d24f339dc10",
  measurementId: "G-27KWQSX1M0",
};

export const Firebase = app.initializeApp(firebaseConfig);
