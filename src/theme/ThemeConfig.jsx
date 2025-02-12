import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";


export const ThemeConfig = ({ children }) => {


  const theme = createTheme();

  // console.log("theme", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
