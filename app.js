window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const key = '898f442c701508af007773e6e6727c48';
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
        });
    } else {
        h1.textContent = "Please enable location access to view the weather forecast.";
    }
});