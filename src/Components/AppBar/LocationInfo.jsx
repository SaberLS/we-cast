import React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function LocationInfo({ name, country, state }) {
  return (
    <Box sx={{ display: { md: 'inline-flex', xs: 'none' } }}>
      <Typography>{name}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: "5px" }} />
      <Typography>{country}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: "5px" }} />
      <Typography>{state}</Typography>
    </Box>
  );
}
