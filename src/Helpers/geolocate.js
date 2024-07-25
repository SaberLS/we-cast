const defaultError = () => console.error("Unable to retrieve your location");

export default async function geolocate(success, error = defaultError) {
    //when a web page tries to access location information, the user is notified and asked to grant permission.
    //The Navigator.geolocation read-only property returns a Geolocation object that gives access to the location of the device.
    if (navigator.geolocation) {
        //checks if geolocation is supported on the user device
        navigator.geolocation.getCurrentPosition(success, error); //Returns position object and calls "succes" function with position as parameter.
    } else {
        console.error("Geolocation not supported");
    }
}