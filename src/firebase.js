import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAxUplV5xgAyy2gCpakQJpSZg6Ql7eShaA",
  authDomain: "instagram-clone-71705.firebaseapp.com",
  projectId: "instagram-clone-71705",
  storageBucket: "instagram-clone-71705.appspot.com",
  messagingSenderId: "624006412944",
  appId: "1:624006412944:web:f1e878fcacc64b7a777615",
  measurementId: "G-2HPHM3CMJK",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
