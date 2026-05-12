// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQisK4zuSmuzur9PSbddM0oEy6IBx4sf4",
  authDomain: "loginauthentication-c30f9.firebaseapp.com",
  projectId: "loginauthentication-c30f9",
  storageBucket: "loginauthentication-c30f9.firebasestorage.app",
  messagingSenderId: "348590969107",
  appId: "1:348590969107:web:d41decd663bbf327688ae6",
  measurementId: "G-9ESG13W239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export const auth = getAuth(app);