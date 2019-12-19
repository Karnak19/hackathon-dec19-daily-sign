import React from "react";
import { Button } from "reactstrap";
import "./Formpage.css";

function GoogleLogin() {
  return (
    <div>
      <Button color="danger" href="">
        <icon name="google plus" /> Se connecter avec Google
      </Button>
    </div>
  );
}

export default GoogleLogin;
