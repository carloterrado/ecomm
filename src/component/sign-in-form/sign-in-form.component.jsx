import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const { email, password, } = formFields;

    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formFields, [name]: value })
    }

    const submitLoginForm = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
           
            console.log(response)
            resetFormField();
        } catch (error) {
            if(error.message === 'Email Not Found') return alert('Invalid Email');
            if(error.message === 'Wrong Password') return alert('Incorrect Password');
        }

    }

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            createUserDocumentFromAuth(user)
        } catch (error) {
            console.error(error.message, 'signInWithGoogle')
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Login with your email and password</span>
            <form onSubmit={submitLoginForm}>
                <FormInput label='Email' type="email" name="email" value={email} onChange={handleChange} required />
                <FormInput label='Password' type="password" name="password" value={password} onChange={handleChange} required />
                <div className="login-button-container">
                    <Button text='Sign In' type="submit" />
                    <Button type="button" text='GOOGLE SIGN IN' onClick={signInWithGoogle} buttonType='google' />
                </div>
            </form>
        </div>
    );
}

export default SignInForm;