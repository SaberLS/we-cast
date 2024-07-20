import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import getLocation from "../../ApiCall/getLocation";
import { ninjaKey } from "../../apiKey";
import { Button } from "@mui/material";

export default function Asynchronous({ setSearchLocation }) {
  const [inputValue, setInputValue] = useState(null);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const response = await getLocation(inputValue, ninjaKey);
      setOptions(response);
    })();

    return () => {
      active = false;
    };
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
        if (newValue.name) {
          setSearchLocation({
            name: newValue.name,
            lon: newValue.longitude,
            lat: newValue.latitude,
            country: newValue.country,
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
          <li key={key} {...optionProps}>
            <Button
              onClick={() => {
                console.log("ss");
              }}
              component="span"
            >
              {option.name}
            </Button>
          </li>
        );
      }}
    />
  );
}
