import httpClient from "./httpClient";
import { React, useState, useEffect } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {

    try {
      const resp = await httpClient.post("//localhost:5001/login", {
        username,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };
};

export default LoginPage;