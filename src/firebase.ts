import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

import config from './config';

const app = initializeApp(config.firebase);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

const auth = getAuth(app);
const storageInstance = getStorage(app);

export const firebaseLogin = (username: string, password: string) => {
  return signInWithEmailAndPassword(auth, username, password);
};

export const firebaseLogout = () => {
  return signOut(auth);
};

export const storage = ref(storageInstance);

export default db;
