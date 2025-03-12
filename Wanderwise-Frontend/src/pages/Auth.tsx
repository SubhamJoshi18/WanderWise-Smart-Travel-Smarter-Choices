import { useState } from "react";
import { Container, Typography, Paper, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Image from "../assets/nature-water-sea-travel-wallpaper-preview.jpg";
import LoginForm from "./Login";
import SignupForm from "./Register";

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const navigate = useNavigate();

  const handleChange = (event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundImage: Image,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          marginTop: 6,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(13, 27, 30, 0.8), rgba(9, 46, 32, 0.8))",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0, 255, 127, 0.3)",
        }}
      >
        <Typography variant="h4" sx={{ color: "#00ff7f", mb: 2 }}>
          WanderWise Auth
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#00ff7f" } }}
        >
          <Tab label="Login" sx={{ color: "white", fontSize: "1.1rem" }} />
          <Tab label="Sign Up" sx={{ color: "white", fontSize: "1.1rem" }} />
        </Tabs>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          key={tabIndex}
        >
          {tabIndex === 0 ? (
            <LoginForm navigate={navigate} />
          ) : (
            <SignupForm navigate={navigate} />
          )}
        </motion.div>
      </Paper>
    </Container>
  );
};

export default AuthPage;
