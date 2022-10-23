import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          py: 2,
          backgroundColor: "#171717",
          color: "#c9c9c9",
        }}
      >
        Copyright &copy; House Of Wear @{year}
      </Typography>
    </footer>
  );
};

export default Footer;
