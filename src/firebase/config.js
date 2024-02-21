import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB45xUE_PcyM5YwEAQ7Zm7fBNwtj-dwAi4",
    authDomain: "proyecto-trello-1.firebaseapp.com",
    projectId: "proyecto-trello-1",
    storageBucket: "proyecto-trello-1.appspot.com",
    messagingSenderId: "717938663592",
    appId: "1:717938663592:web:8a4a492f5d90200abfe29d"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app); 
