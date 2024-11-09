import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfLjakU2aiJxF7z7NQyoK60augTtgTbZk",
  authDomain: "AIzaSyAfLjakU2aiJxF7z7NQyoK60augTtgTbZk",
  projectId: "AIzaSyAfLjakU2aiJxF7z7NQyoK60augTtgTbZk",
  storageBucket: "limitx-debe2.firebasestorage.app",
  messagingSenderId: "809209726619",
  appId: "1:809209726619:web:d2ea146e7e3ff6f56ca83e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
