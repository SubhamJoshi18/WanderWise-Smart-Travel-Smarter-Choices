import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { ISignupBody } from "../interface/auth.interface";
import { SignUpUser } from "../services/auth.service";
import Swal from "sweetalert2";

const SignupForm = ({ navigate }: { navigate: NavigateFunction }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    iconColor: "white",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    console.log({ username, email, password });

    const parsePayload: ISignupBody = { username, email, password };

    try {
      const apiResponse = await SignUpUser(parsePayload);
      console.log(apiResponse);

      Toast.fire({
        icon: "success",
        title: `Registration Successful for ${parsePayload["username"]}!`,
      });

      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      console.error(err);

      Toast.fire({
        icon: "error",
        title: "Registration Failed! Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Username"
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              input: { color: "white" },
              backgroundColor: "#1c1c1c",
              borderRadius: 1,
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: "white" },
              backgroundColor: "#1c1c1c",
              borderRadius: 1,
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            type="password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: "white" },
              backgroundColor: "#1c1c1c",
              borderRadius: 1,
            }}
          />
        </FormControl>

        {error && <FormHelperText error>{error}</FormHelperText>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: "1.2rem",
            borderRadius: "8px",
          }}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
