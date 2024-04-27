import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZKWYTmtjxkYoQfqilpmmrBb_i4hRp9Tc",
  authDomain: "it3206-task-management.firebaseapp.com",
  projectId: "it3206-task-management",
  storageBucket: "it3206-task-management.appspot.com",
  messagingSenderId: "28668054698",
  appId: "1:28668054698:web:338cf46e78e014dff8d4d3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
