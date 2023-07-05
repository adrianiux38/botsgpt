import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  ThemeProvider,
  Grid,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { BACKEND_URL } from "../../config.js";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { userSignTheme } from "../../utils/userSignTheme.js";
import GoogleIcon from "@mui/icons-material/Google";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import logo from "../../img/logoB.png"
import logo2 from "../../img/LOGO.png"

import "./Register.css";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "500px",
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    width: "75%",
  },
  [theme.breakpoints.up("md")]: {
    width: "40vw",
  },
  justifyContent: "center",
  borderRadius: "16px",
  background: "white",
}));

const StyledInput = styled(TextField)({
  borderRadius: "16px",
  marginBottom: "1rem",
});

const StyledButton = styled(Button)({
  borderRadius: "16px",
  marginBottom: "1rem",
});

const RegisterComponent = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const registerGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      fetch(`${BACKEND_URL}/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: accessToken,
        }),
      })
        .then((backendResponse) => {
          if (backendResponse.ok) {
            return backendResponse.json();
          } else {
            return backendResponse.json().then((errorData) => {
              throw new Error(errorData.error);
            });
          }
        })
        .then((data) => {
          //console.log(data.message);
          localStorage.setItem("token", data.token);
          alert("Successfully registered with Google!");
          navigate("/create-bot");
        })
        .catch((error) => {
          console.log(error.message);
          errorMessage(error.message);
        });
    },
  });

  const isInputValid = () => {
    return email !== "" && password !== "";
  };

  const handleRegister = async () => {
    if (isInputValid()) {
      try {
        const response = await fetch(`${BACKEND_URL}/set-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newPassword: password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          // Redirect the user to the login page or log them in automatically
          navigate("/create-bot");
        } else {
          errorMessage(data.error);
        }
      } catch (error) {
        console.log("Error:", error);
        errorMessage(error.message);
      }
    } else {
      setOpen(true);
    }
  };

  const errorMessage = (error) => {
    alert(error);
  };

  return (
    <ThemeProvider theme={userSignTheme}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {!isSmallScreen ? (
          <>
            <Grid
              item
              xs={6}
              sx={{
                background: "linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <img src={logo} alt="logo" style={{ width: "40%" }} />
                <h1 style={{ color: "white", fontSize: "40px" }}>GPT CUSTOM</h1>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                }}
              >
                <Typography variant="h4" component="div">
                  Register
                </Typography>
                <Stack spacing={2} mt={2}>
                  <FormControl error={open}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      sx={{ width: "400px", paddingBottom: "10px" }}
                    />
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ width: "400px" }}
                    />
                    {open && (
                      <FormHelperText>Missing Email Or Password</FormHelperText>
                    )}
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    startIcon={<GoogleIcon />}
                    onClick={() => registerGoogle()}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    style={{ marginTop: "3%" }}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              xs={0}
              sx={{
                background: "linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)",
              }}
            ></Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                }}
              >
                <div><img src={logo2} alt="logo" style={{width: "30%", paddingBottom:"10px"}}/></div>
              <div><h1 style={{ fontSize: "40px",paddingBottom:"50px"}} >BOTS GPT</h1></div>
                <Typography variant="h4" component="div">
                  Register
                </Typography>
                <Stack spacing={2} mt={2}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: "400px" }}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: "400px" }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    startIcon={<GoogleIcon />}
                    onClick={() => registerGoogle()}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    style={{ marginTop: "3%" }}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "90%" }}>
          Missing email or password
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default RegisterComponent;
