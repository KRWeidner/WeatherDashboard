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
var forecastDays = document.querySelector('.forecastDays');

var apiKey = "214431e28055374049b77802959fa948";
var today = dayjs();
var date = today.format('MM/DD/YYYY');
var cities = [];
var citiesArray = [];

//create buttons for every city in local storage upon initial load and set unique ids
var savedCities = localStorage.getItem('cities');
if (savedCities != null) {
    citiesArray = JSON.parse(savedCities);

    citiesArray.forEach(item => {
        var newButton = document.createElement("button");
        newButton.textContent = item.toUpperCase();
        newButton.setAttribute("id",item+"_Button");
        pastCitiesBtnSection.append(newButton);

       // newButton.addEventListener('click', searchPastHistory(item));
    });
}

var searchPastHistory = function (city) {
    console.log(city);
    getWeather(city);
    getForecast(city);
    resultsBody.setAttribute("style","display:flex")
    forecastSection.setAttribute("style","display:flex");
}

//gets entered city by user, ,if it exists, we call getWeather and getForecast functions and set results body to display in the UI
var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = searchCityInput.value.trim();
    if (city) {
        resultsBody.setAttribute("style","display:inline-flex")
        getWeather(city);
        forecastSection.setAttribute("style","display:flex");
        getForecast(city);
    } else {
        alert('Please enter a city name');
    }
};

//makes API call for current weather report. We are searching by the passed input city and converting results to imperial units
var getWeather = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //setting all the elements: temp, icon, wind, humidity
                    cityNameDate.textContent=city.toUpperCase()+" "+ date;
                    weatherIcon.setAttribute("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
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

//calling API for 5 day forecast. Again searching by input city and returning imperial units
var getForecast = function (city) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var fiveDayForcast =[];
                    //gettting forecasts for the next 5 days from the noon reading for a mid day predication
                    fiveDayForcast.push(data.list[4]);
                    fiveDayForcast.push(data.list[12]);
                    fiveDayForcast.push(data.list[20]);
                    fiveDayForcast.push(data.list[28]);
                    fiveDayForcast.push(data.list[36]);

                    var dayCount =1;
                    //for each day forecast, create a new div with 4 new elements for temp, icon, wind, humidity and append it to preexisting class forecastDays
                    fiveDayForcast.forEach(item => {
                        var newDiv = document.createElement("div");
                        newDiv.setAttribute("id","forecast"+dayCount);
                        var newHeader = document.createElement("h3");
                        newHeader.textContent = today.add(dayCount,'day').format('MM/DD/YYYY');
                        newDiv.append(newHeader);
                        var newIcon = document.createElement("img");
                        newIcon.setAttribute("src","https://openweathermap.org/img/wn/"+item.weather[0].icon+"@2x.png");
                        newDiv.append(newIcon);
                        var newTemp = document.createElement("p");
                        newTemp.textContent = "Temp: "+item.main.temp+"°F";
                        newDiv.append(newTemp);
                        var newWind = document.createElement("p");
                        newWind.textContent = "Wind: "+item.wind.speed+" MPH";
                        newDiv.append(newWind);
                        var newHumidity = document.createElement("p");
                        newHumidity.textContent = "Humidity: "+item.main.humidity+"%";
                        newDiv.append(newHumidity);
                        forecastDays.append(newDiv);
                        dayCount++;
                    });

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Error: "+error);
        });
}

//adding a button to list of passed searched city buttons upon finished search of that city
var addHistoryButton = function(passCity){
    var city = passCity.toUpperCase();
    //get localstorage
    var savedCities = localStorage.getItem('cities');
    if (savedCities != null) {
        citiesArray = JSON.parse(savedCities);
    }
    //don't add city to local storage if it already is in the list
    if(!citiesArray.includes(city))
    {
        citiesArray.push(city);
        var newButton = document.createElement("button");
        newButton.textContent = city;
        pastCitiesBtnSection.append(newButton);
        newButton.setAttribute("id",city+"Button");
    }
    //set local storage
    localStorage.setItem("cities", JSON.stringify(citiesArray));
}

//form event listener
formBody.addEventListener('submit', formSubmitHandler);

//console.log(pastCitiesBtnSection.children);
// console.log(pastCitiesBtnSection.childElementCount);

//  for(var i=0; i< pastCitiesBtnSection.childElementCount;i++)
//  {
    
//      console.log(pastCitiesBtnSection.children[i]);
//      var str = pastCitiesBtnSection.children[i].id;
//      var mySubString = str.substring(
//         str.indexOf("#") , 
//         str.lastIndexOf("_")
//     );
//      console.log(str + " HERE");
//      document.body.addEventListener('click', function (event) {
//         if(event.target.id == str)
//         {
//             searchPastHistory(mySubString);
//         }
//      });
     
//      //pastCitiesBtnSection.children[i].addEventListener('click',searchPastHistory(str));
//  }
