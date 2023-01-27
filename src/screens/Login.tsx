import React, { useState } from "react";
import Logo from "../assets/RedTechLogoLogin.svg";
import RedBG from "../assets/signinbackground.jpg";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  FormControlLabel,
  Checkbox,
  TextFieldProps,
} from "@mui/material/";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
export default function Login({
  setAuthenticated,
}: {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigation = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failedUserName, setFailedUsername] = useState<boolean>(false);
  const [failedPassword, setFailedPassword] = useState<boolean>(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    axios
      .post("https://localhost:5000/api/User/login", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        switch (response.data) {
          case 1:
            setFailedUsername(true);
            break;
          case 2:
            setFailedPassword(true);
            break;
          default:
            console.log(response.data);
            let val: any = jwt(response.data);
            localStorage.setItem(
              "role",
              val[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ]
            );
            localStorage.setItem("token", response.data);
            localStorage.setItem("username", userName);
            setAuthenticated(true);
        }
      });
  };
  const sharedInputProps: TextFieldProps = {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    InputProps: { sx: { backgroundColor: "white" } },
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${Logo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundImage: `url(${RedBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              helperText={failedUserName ? "Incorrect Username" : ""}
              error={failedUserName}
              id="username"
              label="Username"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              autoFocus
              {...sharedInputProps}
            />
            <TextField
              helperText={failedPassword ? "Incorrect Password" : ""}
              error={failedPassword}
              margin="normal"
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              {...sharedInputProps}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to={"/forgotpassword"}>Forgot password?</NavLink>
              </Grid>
              <Grid item>
                <NavLink to={"/signup"}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
