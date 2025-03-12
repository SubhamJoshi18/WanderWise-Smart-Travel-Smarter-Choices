import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ResetPasswordApi } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { coRelationId, userId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await ResetPasswordApi(
        { password: newPassword },
        coRelationId as string,
        userId as string
      );
      console.log(response);
      Toast.fire({
        icon: "success",
        title: `Password Reset Successfully!`,
      });

      navigate("/");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      Toast.fire({
        icon: "error",
        title: "Failed to Reset Password! Please try again.",
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
          Reset Password
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="filled"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              input: { color: "white" },
              backgroundColor: "#1c1c1c",
              borderRadius: 1,
              "& .MuiFilledInput-root": {
                borderBottom: "2px solid #00ff7f",
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="filled"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              mt: 2,
              input: { color: "white" },
              backgroundColor: "#1c1c1c",
              borderRadius: 1,
              "& .MuiFilledInput-root": {
                borderBottom: "2px solid #00ff7f",
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1.2rem",
              borderRadius: "8px",
              backgroundColor: "#00ff7f",
              color: "#121212",
              "&:hover": { backgroundColor: "#00cc66" },
            }}
            onClick={handlePasswordReset}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Password"}
          </Button>

          {error && (
            <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>
          )}
        </motion.div>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
