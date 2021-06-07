import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// var firebaseConfig = {
//   apiKey: "AIzaSyBDvKa3i3grCE43CYnLdaa8fomuETnqUeg",
//   authDomain: "nwitter-9a4d3.firebaseapp.com",
//   projectId: "nwitter-9a4d3",
//   storageBucket: "nwitter-9a4d3.appspot.com",
//   messagingSenderId: "406457704686",
//   appId: "1:406457704686:web:1d355db72c37bd869cd3ff"
// };


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};


firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

//firebase를 엄청 부를 예정
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();