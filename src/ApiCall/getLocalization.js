export default async function getCurrentWeather(zip, countryCode, appid) {
    /*
    zip required - Zip/post code. 
    countryCode required - Use ISO 3166 country codes.
    appid required - Your unique API key (you can always find it on your account page under the "API key" tab)
    */
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${appid}`)
        const result = await response.json();
        //console.log(result);
        /* 
        zip - Specified zip/post code in the API request
        name - Name of the found area
        lat - Geographical coordinates of the centroid of found zip/post code (latitude)
        lon - Geographical coordinates of the centroid of found zip/post code (longitude)
        country - Country of the found zip/post code
        */

        return result;
    } catch (e) {
        console.error("getCurrentWeather() error:", e)
    }
}
