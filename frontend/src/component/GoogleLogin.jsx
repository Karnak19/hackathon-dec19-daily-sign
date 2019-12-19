import React from "react";
import { Button } from "reactstrap";
import "./Formpage.css";

function GoogleLogin() {
  return (
    <div>
      <Button color="danger" href="http://localhost:8000/auth/google">
        <icon name="google plus" /> Se connecter avec Google
      </Button>
    </div>
  );
}

export default GoogleLogin;
