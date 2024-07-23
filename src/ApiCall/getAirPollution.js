export async function getCurrentAirPollution(lat, lon, appid) {
    /*
    lat	required - Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    lon	required - Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    appid required - Your unique API key
    */
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appid}`;

    try {
        const response = await fetch(url)
        const result = await response.json();
        //console.log(result);

        return result;
    } catch (e) {
        console.error("getAirPollution() error:", e)
    }
}

export async function getForecastAirPollution(lat, lon, appid) {
    /*
    lat	required - Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    lon	required - Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    appid required - Your unique API key
    */
    const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;

    try {
        const response = await fetch(url)
        const result = await response.json();
        //console.log(result);

        return result;
    } catch (e) {
        console.error("getForecastAirPollution() error:", e)
    }
}

export async function getHistoryAirPollution(lat, lon, start, end, appid) {
    /*
    lat	required - Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    lon	required - Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API
    start required - Start date (unix time, UTC time zone), e.g. start=1606488670
    end	required - End date (unix time, UTC time zone), e.g. end=1606747870
    appid required - Your unique API key
    */
    const url = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${appid}`;

    try {
        const response = await fetch(url)
        const result = await response.json();
        //console.log(result);

        return result;
    } catch (e) {
        console.error("getHistoryAirPollution() error:", e)
    }
}


/*
coord Coordinates from the specified location (latitude, longitude)
list
dt Date and time, Unix, UTC
main
main.aqi Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
If you want to recalculate Air Quality indexes according UK, Europe, USA and Mainland China scales please use 
"Air Pollution Index levels scale" (https://openweathermap.org/air-pollution-index-levels)
components
components.co Сoncentration of CO (Carbon monoxide), μg/m3
components.no Сoncentration of NO (Nitrogen monoxide), μg/m3
components.no2 Сoncentration of NO2 (Nitrogen dioxide), μg/m3
components.o3 Сoncentration of O3 (Ozone), μg/m3
components.so2 Сoncentration of SO2 (Sulphur dioxide), μg/m3
components.pm2_5 Сoncentration of PM2.5 (Fine particles matter), μg/m3
components.pm10 Сoncentration of PM10 (Coarse particulate matter), μg/m3
components.nh3 Сoncentration of NH3 (Ammonia), μg/m3
*/