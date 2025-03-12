import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff7f", // Neon Green
    },
    secondary: {
      main: "#008000", // Dark Green
    },
    background: {
      default: "#121212", // Dark Mode Background
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a5ffce",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 600,
      letterSpacing: "1px",
    },
    button: {
      textTransform: "none",
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
  },
});

export default theme;
