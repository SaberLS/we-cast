import { addParIfE } from "../Helpers/helpers";

export default async function getLocation(name, apiKey, country, limit = 10, min_population, max_population, min_lat, max_lat, min_lon, max_lon,) {
  const url = `https://api.api-ninjas.com/v1/city?name=${name}${addParIfE(country, "country")}${addParIfE(limit, "limit")}${addParIfE(min_population, "min_population")}${addParIfE(max_population, "max_population")}${addParIfE(min_lat, "min_lat")}${addParIfE(max_lat, "max_lat")}${addParIfE(min_lon, "min_lon")}${addParIfE(max_lon, "max_lon")}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": apiKey }
    });
    console.log(url);
    const result = await response.json();
    console.log(result);

    return result
  } catch (e) {
    console.error("getLocation() erro:", e)
  }
}