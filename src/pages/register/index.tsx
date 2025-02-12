import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface MyComponentProps {}
export const RegisterComponent: React.FC<MyComponentProps> = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if(password !== repeatPassword) {
      alert("Passwords do not match!")
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  }


  return (
    <Box>
      <TextField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
    </Box>
  );
};
