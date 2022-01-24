import firebase from 'firebase/app';
import 'firebase/firestore';
import config from "./config.json";

var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 
  const db = firebase.firestore();
  db.settings({ timestampInSnapshots: true });

  export default db;