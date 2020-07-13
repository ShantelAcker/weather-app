window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.unit');

    if(navigator.geolocation) {
        //getting the coordinates from the user
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //will allow us to fetch from the api on a local host
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            //our api key from open weather map
            const key = '898f442c701508af007773e6e6727c48';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`; //add units imperial to get correct temp in fahrenheit

            fetch(api)
            .then(response => {
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                //a way to shorthand to avoid having to type every object property name
                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                const {name} = data;

                const weatherImage = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                //set DOM elements equal to api data
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = description; 
                locationTimezone.textContent = name;
                weatherIcon.innerHTML = `<img src="icons/${icon}.png">`;

                //formulas
                let celcius = (temp - 32) * (5/9);

                //allow to change to celcius/fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureDegree.textContent = Math.floor(celcius);
                        temperatureSpan.textContent = 'C';
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                });
            });
        });

    } else {
        //if the user doesn't allow access to their location
        h1.textContent = "Please enable location access to view the weather forecast.";
    }
});