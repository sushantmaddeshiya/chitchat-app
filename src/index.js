import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB358MZ_aM68bR-r1S-zzeMZnJUn1-a4XQ",
  authDomain: "react-chitchat-app.firebaseapp.com",
  projectId: "react-chitchat-app",
  storageBucket: "react-chitchat-app.appspot.com",
  messagingSenderId: "814911803573",
  appId: "1:814911803573:web:07f035ba569e90ae1aeefc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
