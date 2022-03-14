import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box sx={{ textAlign: 'center', padding: "1rem 1rem" }}>
      <CircularProgress />
    </Box>
  );
}
