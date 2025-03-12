import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import { ForgetPassword } from "../services/auth.service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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

  const forgetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiResponse = await ForgetPassword({ email });

      if (!apiResponse) throw new Error("Error");

      Toast.fire({
        icon: "success",
        title: `Forget Password Email Sent Successfully!`,
      });

      setEmail(""); // Reset email field
    } catch (err) {
      console.error(err);

      Toast.fire({
        icon: "error",
        title: "Failed to Send Email! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          marginTop: 6,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0d1b1e, #092e20)",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 255, 127, 0.3)",
        }}
      >
        <Typography variant="h5" sx={{ color: "#00ff7f", mb: 2 }}>
          Forgot Password?
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <form onSubmit={forgetPasswordSubmit}>
            <TextField
              fullWidth
              label="Enter your email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: "white" },
                backgroundColor: "#1c1c1c",
                borderRadius: 1,
                "& .MuiFilledInput-root": {
                  borderBottom: "2px solid #00ff7f",
                },
              }}
              aria-label="Email"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "1.2rem",
                borderRadius: "8px",
                backgroundColor: "#00ff7f",
                color: "#121212",
                "&:hover": { backgroundColor: "#00cc66" },
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </Button>
          </form>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
