import  { auth } from "./config"
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const provider = new GoogleAuthProvider();

export const google = async () => {
    const res = await signInWithPopup(auth, provider);
      return res  

    
    };
