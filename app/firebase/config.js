// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyB7Mmw3hdKRae2A0FhjES_yf0TENKNIyZI",
    authDomain: "zppsu-auth.firebaseapp.com",
    projectId: "zppsu-auth",
    storageBucket: "zppsu-auth.appspot.com",
    messagingSenderId: "668228889853",
    appId: "1:668228889853:web:64b8e22454953c95a3a294",
    measurementId: "G-4J0B5JP38Z"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export {app, auth}