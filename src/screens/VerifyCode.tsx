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

export default function VerifyCode() {
  const [otpCode, setOtpCode] = useState<string>("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);

  const nav = useNavigate();

  const verifyCode = () => {
    const storedCode = localStorage.getItem("otpCode");
    if (storedCode === otpCode) {
      nav("/resetpassword");
    } else {
      setInvalidCode(true);
    }
  };

  const resendCode = () => {
    let userInfo = localStorage.getItem("userInfo");
    axios
      .post(`https://localhost:5000/api/User/sendSms/${userInfo}`)
      .then((res) => {
        localStorage.setItem("otpCode", res.data);
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
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <HttpsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Verify OTP Code
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="code"
              helperText={invalidCode ? "invalid code" : ""}
              error={invalidCode}
              placeholder="123456"
              autoFocus
              onChange={(e) => setOtpCode(e.target.value)}
              {...sharedInputProps}
            ></TextField>
            <Button
              onClick={verifyCode}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Verify Code
            </Button>
            <Button
              onClick={resendCode}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Resend Verification Text
            </Button>
            <Divider>or</Divider>
            <Box sx={{ textAlign: "center" }}>
              <NavLink to={"/"}>Back to login</NavLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
