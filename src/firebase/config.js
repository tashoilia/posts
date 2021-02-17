import firebase from 'firebase'
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDbTAX5I-gHtuTK0huQA6mRSCpLO3JTHk8",
    authDomain: "social-post-ilia.firebaseapp.com",
    projectId: "social-post-ilia",
    storageBucket: "social-post-ilia.appspot.com",
    messagingSenderId: "1010460323989",
    appId: "1:1010460323989:web:35a1fe64b81fae0f99eb9c",
    measurementId: "G-LZV0M7JSMC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const postStorage = firebase.storage();
  const db = firebase.firestore();

  export {postStorage, db}