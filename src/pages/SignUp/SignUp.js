import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function SignUp() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const { signup, username, setUsername } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert('please enter your name')
    } else {
       signup(state.email, state.password)
         .then((ref) => {
           history.push("/");
         })
         .catch((error) => alert(error.message));
    }
   
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <img
          className="login_wrapper_logo"
          src="http://shimmeringsoul.weebly.com/uploads/1/3/0/3/13031044/1-xkmi4fb5vws6-my7b22lza_1.png"
          alt="insta-logo"
        />
        <form className="login_form">
          <TextField
            type="text"
            label="Name"
            placeholder="Enter Your Name"
            variant="outlined"
            className="login_wrapper_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="email"
            label="Email"
            placeholder="Enter Your Email"
            variant="outlined"
            className="login_wrapper_input"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Enter Your Password"
            variant="outlined"
            className="login_wrapper_input"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Sign Up
          </Button>
        </form>

        <p className="login_wrapper_dont">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
