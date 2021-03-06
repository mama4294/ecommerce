import React, {useState, useContext} from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import {Button} from "../button/button.component"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
        // console.log(formFields)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            if(user){
                const userDocRef = await createUserDocumentFromAuth(user, {displayName});
                resetFormFields();
            }
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("Email is already in use");
            }
            console.log(error)
        }

    }

  return (
    <div className='sign-up-container'>
        <h2>Don't have and account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}> 
            <FormInput required label="Display Name" type="text" name="displayName" onChange={handleChange} value={displayName}/>
            <FormInput required label="Email" type="email" name="email"  onChange={handleChange} value={email}/>
            <FormInput required label="Password" type="password" name="password" onChange={handleChange} value={password}/>
            <FormInput required label="Confirm Password" type="password" name="confirmPassword"  onChange={handleChange} value={confirmPassword}/>
            <Button  type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm
