import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB4hzejy_lpQt2vGG2f7Fc_ltGki8ay164",
    authDomain: "traktix-fyp2021.firebaseapp.com",
    projectId: "traktix-fyp2021",
    storageBucket: "traktix-fyp2021.appspot.com",
    messagingSenderId: "798275439942",
    appId: "1:798275439942:web:4b5745e1f76544de66e947",
    measurementId: "G-NS6NE684HQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  const db = firebase.firestore();
  db.settings({ timestampInSnapshots: true });

  export default db;