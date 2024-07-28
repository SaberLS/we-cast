import { addParIfE } from "../Helpers/helpers";

export default async function openMeteoGeocode(name, count, format, language, apiKey) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}${addParIfE(count, "count")}${addParIfE(format, "format")}${addParIfE(language, "language")}${addParIfE(apiKey, "apiKey")}`

  try {
    const response = await fetch(url)
    const result = await response.json();
    //console.log(result);

    return result;
  } catch (e) {
    console.error("openMeteoGeocode() error:", e)
  }
}