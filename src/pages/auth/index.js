import React, { useState } from "react";
import Login from "../../components/login_form";
import SignUpForm from "../../components/signup_form";
import Logo from "../../components/logo";
import "./index.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleButtonClick = () => {
    setIsSignup(isSignup ? false : true);
  };

  return (
    <section className="auth-page">
      <div className="logo-container">
        <Logo />
        <button className="login-button" onClick={handleButtonClick}>
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </div>
      {isSignup ? <SignUpForm /> : <Login />}
    </section>
  );
};

export default Auth;
