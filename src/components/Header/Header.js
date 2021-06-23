import React from "react";
import "./header.css";
import { Button } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Header() {
  const { signout } = useAuth();

  const history = useHistory();
  const handleSubmit = () => {
    signout();
    history.push("/login");
  };
  return (
    <div className="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="insta logo"
        className="header_image"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Log out
      </Button>
    </div>
  );
}

export default Header;
