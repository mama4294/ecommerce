import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth'

import {auth, signInWithGooglePopup, createUserDocumentFromAuth,signInWithGoogleRedirect} from "../../utils/firebase/firebase.utils"

const SignIn = () =>{

    //Check if a redirect result is available

    useEffect(() => {
        async function fetchData() {
          const response = await getRedirectResult(auth);
          if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log(userDocRef);
        }
        }
        fetchData();
      }, []);


    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }

    const logGoogleRedirectUser = async () =>{
        const {user} = await signInWithGoogleRedirect();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={logGoogleRedirectUser}>Sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn