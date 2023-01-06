import 'firebase/firestore'

import firebase from 'firebase'

const config = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_DATABASE_URL,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STOREAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
}
console.log('config', config)
// Initialize Cloud Firestore through Firebase
firebase.initializeApp(config);

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
