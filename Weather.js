var APPID = "88313d42dc1ecfe90974e094e181cd23";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

// function for API url and zip code. sendRequest (url) sends out call for information in the function.

function updateByZip(zip) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;
    sendRequest (url);
}

// function for sending an API request for various information using database search conditions.

function sendRequest (url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){                         // ready state = 4, recieved package. 200 means successful. 
            var data = JSON.parse(xmlhttp.responseText);                                 // parse responseText = post information.
            var weather = {};
            weather.icon = data.weather[0].id;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.direction = degreesToDirection(data.wind.deg);
            weather.loc = data.name;
            weather.temp = K2T(data.main.temp);
            update(weather);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// convert Kelvin to Fahrenheit.

function K2T(k) {
    return Math.round(k*(9/5)-459.67);
}

// convert direction to compass style by using the number recieved.

function degreesToDirection (degrees) {
    var range = 360/16;                                                                    // degrees by points.
    var low = 360-range/2;
    var high = (low + range) % 360;
    var angles = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    for (i in angles){                                                                    // loop for each value in angles, direction.

        if (degrees >= low && degrees < high)                                              // we are in the range.
            return angles[i];              
        

        low = (low + range) % 360
        high = (high + range) % 360
    }
        return "N";
}

// pass in the weather conditions.

function update(weather) {
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.src ="https://images.freeimages.com/images/large-previews/371/swiss-mountains-1362975.jpg";
}

//when the app loads, elements on the screen.

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

//updateByZip(92110);

    if(!navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        var zip = window.prompt("Could not discover your location. What is your zip code?");
        updateByZip(zip);
    }

}

function showPosition(position){
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

// for updating information by current location.

function updateByGeo (lat, lon) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&APPID=" + APPID;
    sendRequest(url);

}