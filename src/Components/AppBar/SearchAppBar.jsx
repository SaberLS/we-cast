import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import getLocation from "../../ApiCall/getLocation";
import { ninjaKey } from "../../apiKey";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

export default function SearchAppBar({ searchLocation_name, children }) {
  const [input, setInput] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    fetchData();
  }, [input]);

  async function fetchData() {
    const response = await getLocation(input, ninjaKey);
    setResult(response);
    console.log(response);
  }

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
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onInput={({ target }) => {
                target.value && setInput(target.value); //setInput if target.value === true
              }}
              placeholder={searchLocation_name}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
