// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRn8ITMp2XAls-8hT3TZAQnQ-IJ3YSglk",
  authDomain: "my-daily-blog-77087.firebaseapp.com",
  projectId: "my-daily-blog-77087",
  storageBucket: "my-daily-blog-77087.firebasestorage.app",
  messagingSenderId: "658676962363",
  appId: "1:658676962363:web:4568a5df81c490e4dc381e",
  measurementId: "G-HJYVR5BFKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);