import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider, Typography } from "@mui/material";
import openMeteoGeocode from "../../ApiCall/openMeteoGeocode";
import { createTheme } from "@mui/material";


export default function Asynchronous({ setSearchLocation }) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const response = await openMeteoGeocode(inputValue);
      response.results && setOptions(response.results);
    })();
  }, [value, inputValue]);

  const theme = createTheme({
    palette: {text: {
      primary: "#000",
  },}
  })




  return (
    <ThemeProvider theme={theme}>
    <Autocomplete
      id="autocomplete"
      sx={{ width: {md: 300, xs: "100vw"} }}
      getOptionLabel={(option) => (option.name ? option.name : "")}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => (option.name = value.name)}
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        if (newValue) {
          setSearchLocation({
            id: newValue.id,
            name: newValue.name,
            lon: newValue.longitude,
            lat: newValue.latitude,
            country: newValue.country_code,
            admin: newValue.admin1,
          });
        }
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="location" fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        console.log(props);
        console.log(option);

        return (
          <li key={option.id} {...optionProps}>
            <Typography component="span">
              {option.name}\{option.country_code}\{option.admin1}
            </Typography>
          </li>
        );
      }}
    />
    </ThemeProvider>
  );
}
