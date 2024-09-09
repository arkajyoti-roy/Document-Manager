import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz8ZGYj2Ukxi3F4D-aCcGP-V3vVYBE1PE",
  authDomain: "documents-9219a.firebaseapp.com",
  projectId: "documents-9219a",
  storageBucket: "documents-9219a.appspot.com",
  messagingSenderId: "306504461373",
  appId: "1:306504461373:web:dde3490bede06427160e54",
  measurementId: "G-09504K1HSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth();
export const db = getFirestore(app);
export const imageDb = getStorage(app);
export default app;