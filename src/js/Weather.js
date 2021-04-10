/**
 * Constructor to create the current weather for the value the user typed in.
 * Contains properties that is nesseccary for the application and using a fetch method to request data from the API.
 * Converts the received data from the API to JSON.
 */

function Weather() {
    this.place = document.getElementById('search-city').value;
    this.apiKey = 'b9d5cb077497c41bc2a1d53f67cc9bed';
    this.errorElement = document.getElementById('error-message');
    this.errorElement.innerHTML = "";
    this.refresh = document.getElementById('refresh-button');
    var self = this;
    var connected = window.navigator.onLine;
    if (!connected) {
        this.errorElement.innerHTML = "Please connect to internet to display weather.";
    }
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.place + '&appid=' + this.apiKey + '&units=metric')
        .then(function(body) { return body.json() })
        .then(function(data) {
            if (data.cod != 200) {
                self.printError(data);
            } else {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var place = data.name;
                var weatherSevenDays = new WeatherForSevenDays(lat, lon, place);
                self.printTheWeather(data);
            }
        })

    /**
     * Method that receive the data from the API as a parameter.
     * Activates the refresh-button with click-event.
     * Render the data visually for the user
     */

    this.printTheWeather = function(data) {
        this.refresh.style.display = 'block';
        this.refresh.addEventListener('click', function() {
            var currentWeather = new Weather(this.place);
        });
        var rightWrapper = document.getElementById('start-wrapper-right');
        var leftWrapper = document.getElementById('start-wrapper-left');
        var moreInfo = document.getElementById('more-info');
        moreInfo.innerHTML = "";
        var temperature = data.main.temp;
        var city = data.name;
        var tempDesc = data.weather[0].main;
        rightWrapper.innerHTML = "<div class='city-large'>" + city + "</div>";
        rightWrapper.innerHTML += "<div class='temp-large'>" + temperature + "&deg;" + "c" + "</div>";
        var weatherIcon = data.weather[0].icon;
        var icon = "<img src=" + 'http://openweathermap.org/img/w/' + weatherIcon + '.png' + ">";
        moreInfo.innerHTML += "<b>" + "<p>" + "Todays weather " + city + "</b>" + "<p>" + tempDesc + "</p>" + "</p>" + icon + "<p>" + "Feels like: " + data.main.feels_like + "&deg;" + "<p>" + "Max temperature: " + data.main.temp_max + "&deg;" + "<p>" + "Min temperature: " + data.main.temp_min + "&deg;";
    }

    /**
     * Method to print error messages that will be received from the API in case something goes wrong.
     * Uses the data from the parameter.
     */

    this.printError = function(data) {
        var errorMessage = data.message + ", please try another or check the spelling";
        this.errorElement.innerHTML = errorMessage;
    }
}