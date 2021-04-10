/**
 * Class with init function to connect the search-button to the DOM. Adding click-event to the button.
 * When button is clicked instance a new object of the class Weather.
 */

Main = {
    init: function() {
        var getWeatherFromCity = document.getElementById('search-button');
        getWeatherFromCity.addEventListener('click', function() {
            var currentWeather = new Weather();
        });
    }
}

window.addEventListener("load", Main.init);