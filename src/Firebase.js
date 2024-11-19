// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyAxaBHdekXnDxDguE2yev9bX4T_G5GmbwU",
  authDomain: "dofus-brecha.firebaseapp.com",
  projectId: "dofus-brecha",
  storageBucket: "dofus-brecha.appspot.com",
  messagingSenderId: "889951172826",
  appId: "1:889951172826:web:3ef5064ddd2505791a8de3"
};

// Initialize Firebase

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebase_app)
export default db;
