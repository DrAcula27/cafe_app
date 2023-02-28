import React, { useEffect, useState, useContext } from "react";
import { logIn, getUserFromSession } from "../../utilities/user-functions";
import { AppContext } from "../../contexts/app_context";

const Login = () => {
  let { setUser } = useContext(AppContext);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(formState.email && formState.password ? false : true);
  }, [formState]);

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setFormState({
      ...formState,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make a call to the server, and authenticate
    await logIn(formState);

    // get session info (user)
    let user = await getUserFromSession();
    setUser(user);
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disabled}>
            Log In
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default Login;
