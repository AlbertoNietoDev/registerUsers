import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Auth } from "../../store/actions/AuthActions.tsx";
import { cleanCache } from "../../utils/tools.tsx";
import { Alert } from "../../components/Alert.tsx";
import { useStyles } from "./loginStyles.tsx";

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localStyles = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    cleanCache();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      saveAuthData(res?.user);
    } catch (error) {
      Alert({
        props: { icon: { type: "error" }, title: "Error", text: error.message },
      });
      // alert(error.message);
    }
  };

  const saveAuthData = (data: any) => {
    const objToSave = {
      token: data?.accessToken,
      verified: data?.emailVerified,
      uid: data?.uid,
      email: data?.email,
    };
    sessionStorage.setItem("token", objToSave.token);
    dispatch(Auth(objToSave));
    navigate("/main/dashboard");
  };

  const handleGoToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <Stack className={localStyles.mainContainer}>
      <Box className={localStyles.loginBox}>
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
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
        <Button onClick={handleGoToRegister} variant="outlined">
          I dont have an user
        </Button>
      </Box>
    </Stack>
  );
};

export default LoginPage;
