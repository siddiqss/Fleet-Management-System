import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBrMT9K3EJc58bz_TLi73hT1Pqj0iGfWkY",
  authDomain: "traktix-2021.firebaseapp.com",
  projectId: "traktix-2021",
  storageBucket: "traktix-2021.appspot.com",
  messagingSenderId: "253316308827",
  appId: "1:253316308827:web:116500ae3f2fa2f8ab047e",
  measurementId: "G-4QDBJXJ3T4"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
  const db = firebase.firestore();
  db.settings({ timestampInSnapshots: true });

  export default db;