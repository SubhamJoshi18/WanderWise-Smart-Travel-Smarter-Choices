import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { ILoginBody } from "../interface/auth.interface";
import { LoginUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginForm = ({ navigate }: { navigate: NavigateFunction }) => {
  const [email, setEmail] = useState("");
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

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    const parsePayload: ILoginBody = { email, password };

    try {
      const apiResponse = await LoginUser(parsePayload);
      localStorage.setItem("accessToken", apiResponse.data);

      if (!apiResponse) throw new Error("Error");
      console.log(apiResponse);

      Toast.fire({
        icon: "success",
        title: `Login Successful!`,
      });

      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      Toast.fire({
        icon: "error",
        title: "Login Failed! Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 3 }}>
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
          Login
        </Button>

        <Button
          sx={{
            mt: 2,
            color: "#00ff7f",
            fontSize: "1rem",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
