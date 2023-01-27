import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import { NavLink, useNavigate } from "react-router-dom";
import RedBG from "../assets/signinbackground.jpg";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [userInfo, setUserInfo] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const sharedInputProps: TextFieldProps = {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    InputProps: { sx: { backgroundColor: "white" } },
  };

  const nav = useNavigate();

  const navigateToLogin = () => {
    nav("/");
  };
  const handleSendVerificationText = () => {
    localStorage.setItem("userInfo", userInfo);

    axios
      .post(`https://localhost:5000/api/User/sendSms/`, {
        userInfo: userInfo,
      })
      .then((res) => {
        switch (res.data) {
          case 1:
            setErrorMessage("Phone number not found");
            break;
          case 2:
            setErrorMessage("Username not found");
            break;
          default:
            localStorage.setItem("otpCode", res.data);
            console.log(res);
            nav("/otp");
        }
      });
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
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <HttpsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Trouble Logging in?
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="userInfo"
              label="Username or Phone Number"
              error={errorMessage.length > 0 ? true : false}
              helperText={errorMessage}
              autoFocus
              onChange={(e) => setUserInfo(e.target.value)}
              {...sharedInputProps}
            ></TextField>

            <Button
              onClick={handleSendVerificationText}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Send Verification Text
            </Button>
            <Divider>or</Divider>
            <Box sx={{ textAlign: "center" }}>
              <NavLink to={"/"}>Create new account</NavLink>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={navigateToLogin}
              sx={{ mt: 1, mb: 2 }}
            >
              Back To login
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default ForgotPassword;
