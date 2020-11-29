import 'firebase/firestore'

import firebase from 'firebase'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STOREAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
});

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
	return firebase.auth().signOut()
};


export const storage = firebase.storage().ref();

export type UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

export default db;
