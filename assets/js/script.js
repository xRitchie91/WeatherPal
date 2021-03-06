var clearCitiesBtn = document.querySelector("#reset-button");
var zipcodeUserInputEl = document.querySelector("#zipcode");
var zipcodeFormEl = document.querySelector("#zipcode-form");

var searchContainerEl = document.querySelector("#city-search-history")
var searchHistory = [];
var currentSearch = 0;

// this activates our api and retrieves and displays our forcast in the html
function getWeather(zipcode) {
    var weatherAPI = "api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=1f888aff147e6855912e6ab6b7e1ee43";

    fetch(weatherAPI).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            var cityName = document.querySelector("#name-of-city")
            cityName.textContent = response.name;

            var currentDay = document.querySelector("#current-day")
            currentDay.textContent = moment().format("[(]MM[/]D[/]YYYY[)]")

            var weatherIcon = document.querySelector("#weather-icon")
            weatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');

            var temp = document.querySelector("#current-temp")
            temp.textContent = "Temperature: " + response.main.temp + "°F";

            var feelsLike = document.querySelector("#feels-like")
            feelsLike.textContent = "Feels Like: " + response.main.feels_like + "°F";

            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + response.main.humidity + "%";

            var windSpeed = document.querySelector("#wind-speed")
            windSpeed.textContent = "Wind: " + response.wind.speed + " mph";

            // city info
            var searchObj = [{
                city: response.name,
                searchID: currentSearch,
                zipcode: zipcode,
                lat: response.coord.lat,
                long: response.coord.lon
            }]
            searchHistory.push(searchObj)
            localStorage.setItem("searches", JSON.stringify(searchHistory))

            var btnContainer = document.createElement("div")
            btnContainer.className = "row"

            var historyBtn = document.createElement("button")
            historyBtn.className = "btn bg-white border history-button city-button"
            historyBtn.id = zipcode
            historyBtn.textContent = response.name
            historyBtn.addEventListener("click", function (e) {
                console.log(event.target.id);
                getWeather(event.target.id);
            });

            btnContainer.appendChild(historyBtn);
            searchContainerEl.appendChild(btnContainer);

            var lat = response.coord.lat
            var lon = response.coord.lon
            getUVindex(lat, lon)
        })
    currentSearch++
};

// function that allocates all weather info using the weather api key
function getForecast(zipcode) {
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + ",us&units=imperial&appid=1f888aff147e6855912e6ab6b7e1ee43";

    fetch(forecastAPI).then(function (response) {
        return response.json();
    })

        .then(function (response) {
            // Forcast for Day 1
            var day1El = document.querySelector("#day-1")
            day1El.className = "column col forecast-container"

            var headerD1 = document.querySelector("#day-1-date")
            headerD1.className = "forecast-head";
            headerD1.textContent = moment().add(1, "days").format("MM[/]D[/]YYYY");

            var tempD1 = document.querySelector("#day-1-temp")
            tempD1.className = "forcast-information"
            tempD1.textContent = "Temp: " + Math.floor(response.list[3].main.temp) + "°F";

            var humidityD1 = document.querySelector("#day-1-humidity")
            humidityD1.className = "forcast-information"
            humidityD1.textContent = "Humidity: " + response.list[3].main.humidity + "%";

            var day1Icon = document.querySelector("#day1-icon")
            day1Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[3].weather[0].icon + '.png')

            // Forcast for Day 2
            var day2El = document.querySelector("#day-2")
            day2El.className = "column col forecast-container"

            var headerD2 = document.querySelector("#day-2-date")
            headerD2.className = "forecast-head";
            headerD2.textContent = moment().add(2, "days").format("MM[/]D[/]YYYY");

            var tempD2 = document.querySelector("#day-2-temp")
            tempD2.className = "forcast-information"
            tempD2.textContent = "Temp: " + Math.floor(response.list[11].main.temp) + "°F";

            var humidityD2 = document.querySelector("#day-2-humidity")
            humidityD2.className = "forcast-information"
            humidityD2.textContent = "Humidity: " + response.list[11].main.humidity + "%";

            var day2Icon = document.querySelector("#day2-icon")
            day2Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[11].weather[0].icon + '.png')

            // Forecast for Day 3
            var day3El = document.querySelector("#day-3")
            day3El.className = "column col forecast-container"

            var headerD3 = document.querySelector("#day-3-date")
            headerD3.className = "forecast-head";
            headerD3.textContent = moment().add(3, "days").format("MM[/]D[/]YYYY");

            var tempD3 = document.querySelector("#day-3-temp")
            tempD3.className = "forcast-information"
            tempD3.textContent = "Temp: " + Math.floor(response.list[19].main.temp) + "°F";

            var humidityD3 = document.querySelector("#day-3-humidity")
            humidityD3.className = "forcast-information"
            humidityD3.textContent = "Humidity: " + response.list[19].main.humidity + "%";

            var day3Icon = document.querySelector("#day3-icon")
            day3Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[19].weather[0].icon + '.png')

            // Forecast for Day 4
            var day4El = document.querySelector("#day-4")
            day4El.className = "column col forecast-container"

            var headerD4 = document.querySelector("#day-4-date")
            headerD4.className = "forecast-head";
            headerD4.textContent = moment().add(4, "days").format("MM[/]D[/]YYYY");

            var tempD4 = document.querySelector("#day-4-temp")
            tempD4.className = "forcast-information"
            tempD4.textContent = "Temp: " + Math.floor(response.list[27].main.temp) + "°F";

            var humidityD4 = document.querySelector("#day-4-humidity")
            humidityD4.className = "forcast-information"
            humidityD4.textContent = "Humidity: " + response.list[27].main.humidity + "%";

            var day4Icon = document.querySelector("#day4-icon")
            day4Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[27].weather[0].icon + '.png')

            // Forecast for Day 5
            var day5El = document.querySelector("#day-5")
            day5El.className = "column col forecast-container"

            var headerD5 = document.querySelector("#day-5-date")
            headerD5.className = "forecast-head";
            headerD5.textContent = moment().add(5, "days").format("MM[/]D[/]YYYY");

            var tempD5 = document.querySelector("#day-5-temp")
            tempD5.className = "forcast-information"
            tempD5.textContent = "Temp: " + Math.floor(response.list[35].main.temp) + "°F";

            var humidityD5 = document.querySelector("#day-5-humidity")
            humidityD5.className = "forcast-information"
            humidityD5.textContent = "Humidity: " + response.list[35].main.humidity + "%";

            var day5Icon = document.querySelector("#day5-icon")
            day5Icon.setAttribute("src", 'http://openweathermap.org/img/wn/' + response.list[35].weather[0].icon + '.png')
        })
}

// function that keeps and loads the search history
function loadSearchHistory() {
    searchHistory = localStorage.getItem("searches")
    if (!searchHistory || searchHistory === null) {
        searchHistory = [];
        return false;
    }
    searchHistory = JSON.parse(searchHistory)
    displaySearches();
}

// function that clears and deletes search history
function clearSearchHistory() {
    searchHistory = [];
    localStorage.clear();
    location.reload();
}

// function that shows search history to the user
function displaySearches() {
    currentSearch = 0;
    for (var i = 0; i < searchHistory.length; i++) {

        var btnContainer = document.createElement("div")
        btnContainer.className = "row"

        var historyBtn = document.createElement("button");
        //history button class add to match for event listener
        historyBtn.className = "btn bg-white border history-button city-button"
        historyBtn.id = "history-" + currentSearch
        historyBtn.textContent = searchHistory[currentSearch][0].city
        historyBtn.dataset = searchHistory[currentSearch][0].zipcode

        btnContainer.appendChild(historyBtn);
        searchContainerEl.appendChild(btnContainer);

        currentSearch++
    }
}

// function that makes sure that user enters a valid zipcode
function handleSubmit(event) {
    event.preventDefault();
    var zipcode = Number(zipcodeUserInputEl.value.trim());

    if (zipcode) {
        getWeather(zipcode);
        getForecast(zipcode);
        zipcodeUserInputEl.value = "";
    } else {
        alert("Please enter a valid zipcode!");
    }
};

// handles clicks for the clear and search buttons
zipcodeFormEl.addEventListener("submit", handleSubmit);
clearCitiesBtn.addEventListener("click", clearSearchHistory);

loadSearchHistory();