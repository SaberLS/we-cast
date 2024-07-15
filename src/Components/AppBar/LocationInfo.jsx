import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function LocationInfo({ location }) {
  return (
    <Box sx={{ display: "inline-flex" }}>
      <Typography>{location.name}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: "5px" }} />
      <Typography>{location.country}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: "5px" }} />
      <Typography>{location.state}</Typography>
    </Box>
  );
}
