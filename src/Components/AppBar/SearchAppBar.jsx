import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Search } from "../AppBar/Search";
import Select from "../AppBar/Select.jsx";
import LocationInfo from "./LocationInfo.jsx";

export default function SearchAppBar({ setSearchLocation, location }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{}} position="static">
        <Toolbar
          sx={{
            display: { md: "inline-flex", xs: "flex" },
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "space-between",
          }}
        >
          <img
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
            height="40px"
            alt="logo of OpenWeather"
          />

          <Search>
            <Select setSearchLocation={setSearchLocation} />
          </Search>
          <LocationInfo
            name={location.name}
            country={location.country}
            admin={location.admin}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
