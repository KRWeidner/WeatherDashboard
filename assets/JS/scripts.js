var cityNameDate = document.querySelector('#currentCityWeather');
var cityTemp = document.querySelector('#currentCityTemp');
var cityWind = document.querySelector('#currentCityWind');
var cityHumidity = document.querySelector('#currentCityHumidity');
var pastCitiesBtnSection = document.querySelector('.searchHistoryBtns');
var submitButton = document.querySelector('.btnSubmit');
var searchCityInput = document.querySelector('#cityInput');
var forecastSection = document.querySelector('.forecastSection');
var formBody = document.querySelector('#form-body');

var apiKey = "214431e28055374049b77802959fa948";

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = searchCityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
};

var getWeather = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    //displayRepos(data, user);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Error: "+error);
        });
};

formBody.addEventListener('submit', formSubmitHandler);