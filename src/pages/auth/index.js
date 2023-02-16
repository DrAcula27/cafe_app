import React, { useState } from "react";
import Login from "../../components/login_form";
import SignUpForm from "../../components/signup_form";
import "./index.css";

const Auth = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(true);

  const handleButtonClick = () => {
    setIsSignup(isSignup ? false : true);
  };

  return (
    <section className="auth-page">
      <div>
        <div>Logo</div>
        <div className="login-button" onClick={handleButtonClick}>
          {isSignup ? "Log In" : "Sign Up"}
        </div>
      </div>
      {isSignup ? <SignUpForm /> : <Login setUser={setUser} />}
    </section>
  );
};

export default Auth;
