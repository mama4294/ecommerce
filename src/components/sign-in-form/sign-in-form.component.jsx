import React, {useState, useEffect, useContext} from 'react'

import {signUserInWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import {Button, BUTTON_TYPE_CLASS} from "../button/button.component"
import {getRedirectResult} from 'firebase/auth'
import {auth, signInWithGooglePopup, createUserDocumentFromAuth,signInWithGoogleRedirect} from "../../utils/firebase/firebase.utils"
import FormInput from '../form-input/form-input.component'
import {UserContext} from "../../contexts/user.context"

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}



const logGoogleUser = async () =>{
    await signInWithGooglePopup();
}

// const logGoogleRedirectUser = async () =>{
//     const {user} = await signInWithGoogleRedirect();
//     const userDocRef = await createUserDocumentFromAuth(user);
//     // console.log(userDocRef)
// }


const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }


    //Check if a redirect result is available
    useEffect(() => {
        async function fetchData() {
          const response = await getRedirectResult(auth);
          if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
            // console.log(userDocRef);
        }
        }
        fetchData();
      }, []);


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
        // console.log(formFields)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const {user} = await signUserInWithEmailAndPassword(email, password)
            if(user){
                resetFormFields();
            }
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password': alert("Wrong password"); break;
                case 'auth/user-not-found': alert("User not found"); break;
                default: alert("Something went wrong"); console.log(error);
            }
        }

    }

  return (
    <div className='sign-up-container'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}> 
            <FormInput required label="Email" type="email" name="email"  onChange={handleChange} value={email}/>
            <FormInput required label="Password" type="password" name="password" onChange={handleChange} value={password}/>
            <div className='buttons-container'>
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType={BUTTON_TYPE_CLASS.google} onClick={logGoogleUser}>Google Sign In</Button>
            </div>
        </form>

        {/* <Button buttonType={"google"} onClick={logGoogleRedirectUser}>Sign in with Google Redirect</Button> */}
    </div>
  )
}

export default SignUpForm
