import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlyAxab-mtMd815Y-QXvPDw6PTTiz4llU",
    authDomain: "your-web-e9b08.firebaseapp.com",
    projectId: "your-web-e9b08",
    storageBucket: "your-web-e9b08.firebasestorage.app",
    messagingSenderId: "243330117284",
    appId: "1:243330117284:web:df84ee9f6c21ce86178031",
    measurementId: "G-RZFWKKSP6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
    try {
        analytics = getAnalytics(app);
    } catch (e) {
        console.warn("Firebase Analytics could not be initialized:", e);
    }
}

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics, db };
