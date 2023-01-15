import 'firebase/firestore';

import firebase from 'firebase';

import config from './config';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(config.firebase);

var db = firebase.firestore();

db.enablePersistence().catch(function (err) {
  console.error(err);
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export const firebaseLogin = (username: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(username, password);
};

export const firebaseLogout = () => {
  return firebase.auth().signOut();
};

export const storage = firebase.storage().ref();

export type UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

export default db;
