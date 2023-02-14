import React, { useState } from "react";
import Login from "../../components/login_form";
import SignUpForm from "../../components/signup_form";
import "./index.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleButtonClick = () => {
    isSignup ? setIsSignup(false) : setIsSignup(true);
  };

  return (
    <section className="auth-page">
      <div>
        <div>Logo</div>
        <div className="login-button" onClick={handleButtonClick}>
          {isSignup ? "Sign Up" : "Log In"}
        </div>
      </div>
      {isSignup ? <SignUpForm /> : <Login />}
    </section>
  );
};

export default Auth;
