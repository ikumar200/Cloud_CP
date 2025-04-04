// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyDBaiHWwEmoMoiab3Ii79EFY0LmqL1tc",
  authDomain: "cc06-31f6c.firebaseapp.com",
  projectId: "cc06-31f6c",
  storageBucket: "cc06-31f6c.firebasestorage.app",
  messagingSenderId: "89653483855",
  appId: "1:89653483855:web:e6f46d3a75e7856e2b0d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
