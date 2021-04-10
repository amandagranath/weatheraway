/**
 * Constructor to instance objects for the multi day forecast.
 * Accepts params lat, lon, place which are all strings.
 * Fetch the forecast from the API using fetch method.
 * Converts the reveiced data from the API to JSON.
 */

function WeatherForSevenDays(lat, lon, place) {
    this.lat = lat;
    this.lon = lon;
    this.apiKey = 'b9d5cb077497c41bc2a1d53f67cc9bed';
    this.city = place;
    this.expandModal = document.getElementById('toggle-menu');
    this.sideContent = document.getElementById('expand');
    var self = this;

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.lat + '&lon=' + this.lon + '&exclude=hourly,minutely,current' + '&appid=' + this.apiKey + '&units=metric')
        .then(function(body) { return body.json() })
        .then(function(data) {
            self.printForecast(data);
            self.openModal();
        })

    /**
     *Method to print the weather. Accepts the object from the fetch-method as the parameter data.
     Loop through the array of weather for 8 days and exclude the first one which is the current day.
     Convert the unix-stamp to readable form.
     */

    this.printForecast = function(data) {
        this.sideContent.innerHTML = "";
        this.sideContent.innerHTML += "8 days forecast " + this.city;
        for (i = 1; i < data.daily.length; i++) {
            var temp = data.daily[i].temp.day;
            var unix = data.daily[i].dt;
            var milli = unix * 1000;
            var dateO = new Date(milli);
            var realDate = dateO.toLocaleDateString();
            var imgIcon = data.daily[i].weather[0].icon;
            var imgSource = "<img src=" + 'http://openweathermap.org/img/w/' + imgIcon + '.png' + ">";
            this.sideContent.innerHTML += "<div id='inner-expand'>" + realDate + "<p>" + imgSource + temp + "&deg;" + "c" + "</p>" + "</div>";
        }
    }

    /**
     * Methos to open the forecast module, it's done with click-event.
     * Using self to refer to the scope in the constructor.
     */

    this.openModal = function() {
        this.expandModal.addEventListener('click', function(event) {
            self.sideContent.style.display = 'block';
            self.expandModal.className = 'close1';
            self.expandModal.innerHTML = '&times;';
            self.closeModal();
        });
    }

    /**
     * Method to close the forecast module. Using click-event.
     * Change the display to none so the module won't be visible.
     */

    this.closeModal = function() {
        this.expandModal.addEventListener('click', function(event) {
            self.sideContent.style.display = 'none';
            self.expandModal.className = 'toggle1';
            self.expandModal.innerHTML = ">";
            self.openModal();
        });
    }
}