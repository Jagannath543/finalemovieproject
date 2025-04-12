import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRHVGaoVB9aDQX9Vx5wLH-h0DV2eiUFuw",
  authDomain: "react-authentication-5403e.firebaseapp.com",
  projectId: "react-authentication-5403e",
  storageBucket: "react-authentication-5403e.firebasestorage.app",
  messagingSenderId: "863520280528",
  appId: "1:863520280528:web:96df20e4efe6ffad94f3d5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);





