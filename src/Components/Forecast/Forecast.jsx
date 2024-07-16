import React, { useEffect, useState } from "react";
import getForecast from "../../ApiCall/getForecast";
import { apiKey } from "../../apiKey";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import { cnvtUTC, cnvtShiftUTC } from "../../Helpers/helpers";

export default function Forecast({ searchLocation }) {
  const [forecast, setForecast] = useState({
    city: {
      name: "",
    },
    list: [],
  });

  useEffect(() => {
    callForecast();
  }, [searchLocation]);

  async function callForecast() {
    if (searchLocation.lat) {
      const response = await getForecast(
        searchLocation.lat,
        searchLocation.lon,
        apiKey
      );

      setForecast({
        city: response.city,
        list: response.list,
      });

      console.log(forecast);
    }
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <Typography gutterBottom variant="h5" component="div">
          {forecast.city.name}
        </Typography>
        <Typography gutterBottom component="div">
          timezone: {cnvtShiftUTC(forecast.city.timezone)}
          <Divider />
          sunrise: {cnvtUTC(forecast.city.sunrise)}
          <Divider />
          sunset: {cnvtUTC(forecast.city.sunset)}
          <Divider />
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
