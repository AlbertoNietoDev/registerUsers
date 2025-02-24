import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./registerStyle.tsx";

interface MyComponentProps {}

export const RegisterPage: React.FC<MyComponentProps> = () => {
  const navigate = useNavigate();
  const localStyles = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("User registered:", user);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  const handleReturnLogin = () => {
    navigate("/auth/login");
  };

  return (
    <Stack className={localStyles.mainContainer}>
      <Box className={localStyles.registerBox}>
        <TextField
          label={"Email"}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={"Password"}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={"Repeat Password"}
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Button onClick={handleRegister} variant="contained">
          Register
        </Button>
        <Button onClick={handleReturnLogin} variant="outlined">
          I already have an user
        </Button>
      </Box>
    </Stack>
  );
};
