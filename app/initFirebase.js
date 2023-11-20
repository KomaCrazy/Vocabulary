import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDz9LO8w2tk-dUs-vEZV1RfJJzKmk7AXjY",
  authDomain: "vocabulary-c9c77.firebaseapp.com",
  projectId: "vocabulary-c9c77",
  storageBucket: "vocabulary-c9c77.appspot.com",
  messagingSenderId: "619138693150",
  appId: "1:619138693150:web:2e77df35d89616a5a8560f",
  measurementId: "G-WCQNT96NVB"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);