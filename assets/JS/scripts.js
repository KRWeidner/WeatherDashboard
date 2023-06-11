var cityNameDate = document.querySelector('#currentCityWeather');
var cityTemp = document.querySelector('#currentCityTemp');
var cityWind = document.querySelector('#currentCityWind');
var cityHumidity = document.querySelector('#currentCityHumidity');
var pastCitiesBtnSection = document.querySelector('.searchHistoryBtns');
var submitButton = document.querySelector('.btnSubmit');
var searchCityInput = document.querySelector('#cityInput');
var forecastSection = document.querySelector('.forecastSection');
var formBody = document.querySelector('#form-body');
var resultsBody = document.querySelector('.resultsBody');
var weatherIcon = document.querySelector('#weatherIcon');

var apiKey = "214431e28055374049b77802959fa948";
var today = dayjs();
var date = today.format('MM/DD/YYYY');
var cities = [];
var citiesArray = [];

//create buttons for every city in local storage upon initial load
var savedCities = localStorage.getItem('cities');
if (savedCities != null) {
    citiesArray = JSON.parse(savedCities);

    citiesArray.forEach(item => {
        var newButton = document.createElement("button");
        newButton.textContent = item.toUpperCase();
        newButton.setAttribute("id",item+"Button");
        pastCitiesBtnSection.append(newButton);
    });
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = searchCityInput.value.trim();
    if (city) {
        resultsBody.setAttribute("style","display:inline-flex")
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
};

var getWeather = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    cityNameDate.textContent=city.toUpperCase()+" "+ date;
                    weatherIcon.setAttribute("src","https://openweathermap.org/img/wn/10d@2x.png");
                    cityTemp.textContent="Temp: "+data.main.temp+"°F";
                    cityHumidity.textContent="Humidity: "+data.main.humidity+"%";
                    cityWind.textContent="Wind: "+data.wind.speed+" MPH";
                    addHistoryButton(city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Error: "+error);
        });
};

var addHistoryButton = function(passCity){
    var city = passCity.toUpperCase();
    var savedCities = localStorage.getItem('cities');
    if (savedCities != null) {
        citiesArray = JSON.parse(savedCities);
    }
    if(!citiesArray.includes(city))
    {
        citiesArray.push(city);
        var newButton = document.createElement("button");
        newButton.textContent = city;
        pastCitiesBtnSection.append(newButton);
        newButton.setAttribute("id",city+"Button");
    }
    localStorage.setItem("cities", JSON.stringify(citiesArray));
}

formBody.addEventListener('submit', formSubmitHandler);