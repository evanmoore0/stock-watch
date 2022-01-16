// Import the functions you need from the SDKs you need
import apiConfig from "./api.config";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {initializeApp} from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiConfig.FIREBASE_API_KEY,
  authDomain: apiConfig.FIREBASE_AUTH_DOMAIN,
  projectId: apiConfig.FIREBASE_PROJECT_ID,
  storageBucket: apiConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: apiConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: apiConfig.FIREBASE_APP_ID,
  measurementId: apiConfig.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);


 const db = getFirestore();

const auth = getAuth()
// const db = getFirestore()



export {auth, db}

