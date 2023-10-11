import React from "react";
import { Box, TextField } from "@mui/material";
import "./Header.css";

export const Header = ({ handleSearch }) => {
  return (
    <Box className="box">
      <TextField
        onChange={handleSearch}
        size="small"
        className="search"
        id="outlined-basic"
        variant="outlined"
        placeholder="Search by Name, Email or Role"
      />
    </Box>
  );
};
