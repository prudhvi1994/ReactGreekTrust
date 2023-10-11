import React from "react";
import { Pagination, Stack, Button } from "@mui/material";
import "./Footer.css";

export const Footer = ({
  handlePageChange,
  handlePaginationLength,
  handleSelection
}) => {
  return (
    <Stack
      className="footer"
      direction="row"
      spacing={3}
      alignItems="center"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        onClick={handleSelection}
        variant="contained"
        sx={{ borderRadius: 30, bgcolor: "#e76f51" }}
      >
        Delete Selected
      </Button>
      <Pagination
        color="secondary"
        variant="outlined"
        m="auto"
        onChange={handlePageChange}
        count={handlePaginationLength}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};
