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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { NavLink, useNavigate } from "react-router-dom";
import RedBG from "../assets/signinbackground.jpg";
import { useState } from "react";
import axios from "axios";
export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [ismatching, setIsMatching] = useState<boolean>(false);
  const nav = useNavigate();
  const sharedInputProps: TextFieldProps = {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    InputProps: { sx: { backgroundColor: "white" } },
  };

  const verifyPasswords = async () => {
    if (password === confirmPassword) {
      await axios
        .put(`https://localhost:5000/api/User/resetPassword`, {
          passwordHash: password,
          userInfo: "bry",
        })
        .then((res) => {
          console.log(res);
        });
      nav("/");
    } else {
      setIsMatching(true);
    }
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
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Reset Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              id="password"
              type="password"
              autoFocus
              error={ismatching}
              helperText={ismatching ? "Passwords are not the same" : ""}
              label=" New Password"
              onChange={(e) => setPassword(e.target.value)}
              {...sharedInputProps}
            ></TextField>
            <TextField
              id="password"
              autoFocus
              type="password"
              error={ismatching}
              helperText={ismatching ? "Passwords are not the same" : ""}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              {...sharedInputProps}
            ></TextField>
            <Button
              fullWidth
              onClick={verifyPasswords}
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
