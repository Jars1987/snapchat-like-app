import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAnA7cqWWwVRkolLABhJGGmbIyjzagOGP0',
  authDomain: 'snapchat-like-app.firebaseapp.com',
  projectId: 'snapchat-like-app',
  storageBucket: 'snapchat-like-app.appspot.com',
  messagingSenderId: '481761640069',
  appId: '1:481761640069:web:95d4513d4c4bd36d77b3ec',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
