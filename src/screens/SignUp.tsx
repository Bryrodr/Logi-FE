import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  TextFieldProps,
} from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RedBG from "../assets/signinbackground.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [numberExists, setNumberExists] = useState<boolean>(false);
  const [userNameExists, setUserNameExists] = useState<boolean>(false);

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .post("https://localhost:5000/api/User/register", {
        username: userName,
        passwordHash: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        switch (response.data) {
          case 1:
            setNumberExists(true);
            break;
          case 2:
            setUserNameExists(true);
            break;
          default:
            navigate("/");
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
    <Grid
      container
      sx={{
        backgroundImage: `url(${RedBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container
        maxWidth="xs"
        component={Paper}
        elevation={6}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          opacity: "0.7",
          height: "fit-content",
          marginTop: "10vh",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={HandleSubmit} sx={{ mt: 1 }}>
            <TextField
              id="FirstName"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="FirstName"
              autoFocus
              {...sharedInputProps}
            ></TextField>
            <TextField
              id="LastName"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="LastName"
              autoFocus
              {...sharedInputProps}
            ></TextField>
            <TextField
              id="PhoneNumber"
              label="Phone Number"
              helperText={numberExists ? "Number is already in use" : ""}
              error={numberExists}
              type="tel"
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="PhoneNumber"
              autoFocus
              {...sharedInputProps}
            ></TextField>

            <TextField
              id="username"
              label="Username"
              helperText={userNameExists ? "username is taken" : ""}
              error={userNameExists}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              autoFocus
              {...sharedInputProps}
            ></TextField>
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              autoFocus
              {...sharedInputProps}
            ></TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center" }}>
              <NavLink to={"/"}>Already have an account? Sign in</NavLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default SignUp;
