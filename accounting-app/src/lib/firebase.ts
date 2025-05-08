import { initializeApp, getApps, getApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC08CEgnNJbFZuq27-q3DfcZ67Z_1kZKaM",
  authDomain: "reactexercise-accounting.firebaseapp.com",
  projectId: "reactexercise-accounting",
  storageBucket: "reactexercise-accounting.firebasestorage.app",
  messagingSenderId: "289500032652",
  appId: "1:289500032652:web:df53d73d8cb858c0d2d5a9"
};

// 初始化 Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


// 初始化 Auth
export const auth = getAuth(app);
export const db = getFirestore(app); 