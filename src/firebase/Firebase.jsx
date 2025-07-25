import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbCzlaFpq9MZ9SeITKXu41NcmpChs459Y",
  authDomain: "upnext-codes.firebaseapp.com",
  projectId: "upnext-codes",
  storageBucket: "upnext-codes.firebasestorage.app",
  messagingSenderId: "1009014190135",
  appId: "1:1009014190135:web:968cafcc523a0c4607cfb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;