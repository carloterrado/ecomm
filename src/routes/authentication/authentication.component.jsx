import SignInForm from "../../component/sign-in-form/sign-in-form.component";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";


const Authentication = () => {
    return (
        <div className="sign-in"> 
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;