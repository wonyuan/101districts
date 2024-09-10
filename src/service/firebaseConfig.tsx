// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr8Iklfiyy3yqRTa1th6-5Zg-42iSi-gs",
  authDomain: "travel-planning-a7b9a.firebaseapp.com",
  projectId: "travel-planning-a7b9a",
  storageBucket: "travel-planning-a7b9a.appspot.com",
  messagingSenderId: "206267122147",
  appId: "1:206267122147:web:4dc1404292000435de20d6",
  measurementId: "G-TSX3FSXBVZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// 