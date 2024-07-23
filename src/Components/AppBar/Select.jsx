import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
import openMeteoGeocode from "../../ApiCall/openMeteoGeocode";

export default function Asynchronous({ searchLocation, setSearchLocation }) {
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

  return (
    <Autocomplete
      id="autocomplete"
      sx={{ width: 300 }}
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
  );
}
