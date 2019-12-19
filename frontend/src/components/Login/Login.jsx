import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { API_URL } from "../../env";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";

function Login() {
  const [tooken, setTooken] = useState("");
  const location = useLocation();
  const { token } = queryString.parse(location.search);

  useEffect(() => {
    if (token) {
      setTooken(token);
    }
  }, []);
  console.log(token);
  return (
    <Button href={`${API_URL}/auth/google`} color="secondary" size="sm">
      Connection
    </Button>
  );
}

export default Login;
