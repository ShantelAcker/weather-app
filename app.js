window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        //getting the coordinates from the user
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //will allow us to fetch from the api on a local host
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            //our api key from open weather map
            const key = '898f442c701508af007773e6e6727c48';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(api)
            .then(response => {
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                //a way to shorthand to avoid having to type every object name
                const {temp} = data.main;
                const {description} = data.weather;
            })
        });

    } else {
        //if the user doesn't allow access to their location
        h1.textContent = "Please enable location access to view the weather forecast.";
    }
});