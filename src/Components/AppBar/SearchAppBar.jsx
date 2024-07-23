import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Select from "./Select";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function SearchAppBar({
  searchLocation,
  setSearchLocation,
  children,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          <img
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
            height="40px"
            alt="logo of OpenWeather"
          />

          <Search>
            <Select
              setSearchLocation={setSearchLocation}
              searchLocation={searchLocation}
            />
          </Search>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
