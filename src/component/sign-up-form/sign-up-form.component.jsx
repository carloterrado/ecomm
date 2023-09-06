import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {
    const [formFields, setFormField] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormField = () => {
        setFormField(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formFields, [name]: value })
    }

    const submitSignupForm = async (event) => {
        try {
            event.preventDefault();
            if (password !== confirmPassword) return;

            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth({ ...user, displayName });
            resetFormField()

        } catch (error) {

            if (error.code === 'auth/email-already-in-use') alert('Email already in use')
            else console.log(error.message, 'handleSubmit')
        }


    }
    // console.log(formFields)
    return (
        <div className="sign-up-container">
            <h2>Don't have an Account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitSignupForm}>
                <FormInput label='Display Name' type="text" name="displayName" value={displayName} onChange={handleChange} required />
                <FormInput label='Email' type="email" name="email" value={email} onChange={handleChange} required />
                <FormInput label='Password' type="password" name="password" value={password} onChange={handleChange} required />
                <FormInput label='Confirm Password' type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />

                <Button text='Sign Up' type="submit" />
            </form>
        </div>
    )
}

export default SignUpForm;