// Variables for API " 2a5629dbd76c990d83e5d8e2cf6fe7c6"
const APIKey = "71bc39ce704909bddd56694ecdccad8e";
let city = "My Current Location";
let latitude = "";
let longitude = "";

// Param Elements
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

let searchHistory = [];
let storedCityNames = JSON.parse(localStorage.getItem("searchHistory"));
let searchHistoryContainer = document.querySelectorAll(
  ".parameters .search-history"
);

// Main Weather Box Elements
const todayEl = document.getElementById("today");
const selectedCity = document.querySelector("#today-section .city");
const selectedIcon = document.querySelector("#today-section .icon");
const selectedTemp = document.querySelector("#today-section .temp span");
const selectedWind = document.querySelector("#today-section .wind span");
const selectedHumidity = document.querySelector(
  "#today-section .humidity span"
);
const selectedUv = document.querySelector("#today-section .uv span");

// 5 Day Forecast Econst oneDayLaterDate = document.querySelector('#one-day-later .date');
const oneDayLaterDate = document.querySelector("#one-day-later .date");
const oneDayLaterIcon = document.querySelector("#one-day-later .icon");
const oneDayLaterTemp = document.querySelector("#one-day-later .temp span");
const oneDayLaterWind = document.querySelector("#one-day-later .wind span");
const oneDayLaterHumidity = document.querySelector(
  "#one-day-later .humidity span"
);

const twoDaysLaterDate = document.querySelector("#two-days-later .date");
const twoDaysLaterIcon = document.querySelector("#two-days-later .icon");
const twoDaysLaterTemp = document.querySelector("#two-days-later .temp span");
const twoDaysLaterWind = document.querySelector("#two-days-later .wind span");
const twoDaysLaterHumidity = document.querySelector(
  "#two-days-later .humidity span"
);

const threeDaysLaterDate = document.querySelector("#three-days-later .date");
const threeDaysLaterIcon = document.querySelector("#three-days-later .icon");
const threeDaysLaterTemp = document.querySelector(
  "#three-days-later .temp span"
);
const threeDaysLaterWind = document.querySelector(
  "#three-days-later .wind span"
);
const threeDaysLaterHumidity = document.querySelector(
  "#three-days-later .humidity span"
);

const fourDaysLaterDate = document.querySelector("#four-days-later .date");
const fourDaysLaterIcon = document.querySelector("#four-days-later .icon");
const fourDaysLaterTemp = document.querySelector("#four-days-later .temp span");
const fourDaysLaterWind = document.querySelector("#four-days-later .wind span");
const fourDaysLaterHumidity = document.querySelector(
  "#four-days-later .humidity span"
);

const fiveDaysLaterDate = document.querySelector("#five-days-later .date");
const fiveDaysLaterIcon = document.querySelector("#five-days-later .icon");
const fiveDaysLaterTemp = document.querySelector("#five-days-later .temp span");
const fiveDaysLaterWind = document.querySelector("#five-days-later .wind span");
const fiveDaysLaterHumidity = document.querySelector(
  "#five-days-later .humidity span"
);

// Get Dates
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
let dd1 = String(today.getDate() + 1).padStart(2, "0");
let dd2 = String(today.getDate() + 2).padStart(2, "0");
let dd3 = String(today.getDate() + 3).padStart(2, "0");
let dd4 = String(today.getDate() + 4).padStart(2, "0");
let dd5 = String(today.getDate() + 5).padStart(2, "0");
today = mm + "/" + dd + "/" + yyyy;
todayEl.innerHTML = today;
oneDayLaterDate.innerHTML = mm + "/" + dd1 + "/" + yyyy;
twoDaysLaterDate.innerHTML = mm + "/" + dd2 + "/" + yyyy;
threeDaysLaterDate.innerHTML = mm + "/" + dd3 + "/" + yyyy;
fourDaysLaterDate.innerHTML = mm + "/" + dd4 + "/" + yyyy;
fiveDaysLaterDate.innerHTML = mm + "/" + dd5 + "/" + yyyy;

// get stored cities from localstorage or set an empty array
function getStoredCities() {
  if (storedCityNames === null) {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    setHandlers();
  } else {
    for (let i = 0; i < storedCityNames.length; i++) {
      const el = storedCityNames[i];
      const btn = document.createElement("button");
      btn.innerHTML = el;
      document.getElementById("search-history").appendChild(btn);
      searchHistory.push(el);
    }

    setHandlers();
  }
}

// update weather info
function updateWeather() {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&exclude=hourly&units=imperial&appid=" +
    APIKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      if (city !== "My Current Location") {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        const newCity = document.createElement("button");
        newCity.innerHTML = city;
        newCity.addEventListener("click", function () {
          city = newCity.innerHTML;
          getCoord();
        });
        document.getElementById("search-history").appendChild(newCity);
      }
      // Today
      selectedCity.innerHTML = city + " (" + today + ")";
      if (data.current.weather[0].icon === "01d") {
        selectedIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.current.weather[0].icon === "02d") {
        selectedIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.current.weather[0].icon === "03d") {
        selectedIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.current.weather[0].icon === "04d") {
        selectedIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.current.weather[0].icon === "09d") {
        selectedIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.current.weather[0].icon === "10d") {
        selectedIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.current.weather[0].icon === "11d") {
        selectedIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.current.weather[0].icon === "13d") {
        selectedIcon.src = "./assets/imgs/snow.svg";
      } else if (data.current.weather[0].icon === "50d") {
        selectedIcon.src = "./assets/imgs/mist.svg";
      } else if (data.current.weather[0].icon === "01n") {
        selectedIcon.src = "./assets/imgs/clear-night.svg";
      } else if (data.current.weather[0].icon === "02n") {
        selectedIcon.src = "./assets/imgs/partly-cloudy-night.svg";
      } else if (data.current.weather[0].icon === "03n") {
        selectedIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.current.weather[0].icon === "04n") {
        selectedIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.current.weather[0].icon === "09n") {
        selectedIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.current.weather[0].icon === "10n") {
        selectedIcon.src = "./assets/imgs/partly-cloudy-night-rain.svg";
      } else if (data.current.weather[0].icon === "11n") {
        selectedIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.current.weather[0].icon === "13n") {
        selectedIcon.src = "./assets/imgs/snow.svg";
      } else if (data.current.weather[0].icon === "50n") {
        selectedIcon.src = "./assets/imgs/mist.svg";
      }
      selectedIcon.style.opacity = "1";
      selectedTemp.innerHTML = data.current.temp + "&deg;F";
      selectedWind.innerHTML = data.current.wind_speed + " MPH";
      selectedHumidity.innerHTML = data.current.humidity + "%";
      let uvi = data.current.uvi;
      selectedUv.innerHTML = uvi;
      if (uvi > 5) {
        selectedUv.classList.add("severe");
      } else if (uvi > 2) {
        selectedUv.classList.add("moderate");
      } else {
        selectedUv.classList.add("favorable");
      }

      // One day later
      oneDayLaterTemp.innerHTML = data.daily[0].temp.day + "&deg;F";
      if (data.daily[0].weather[0].icon === "01d") {
        oneDayLaterIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.daily[0].weather[0].icon === "02d") {
        oneDayLaterIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.daily[0].weather[0].icon === "03d") {
        oneDayLaterIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.daily[0].weather[0].icon === "04d") {
        oneDayLaterIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.daily[0].weather[0].icon === "09d") {
        oneDayLaterIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.daily[0].weather[0].icon === "10d") {
        oneDayLaterIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.daily[0].weather[0].icon === "11d") {
        oneDayLaterIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.daily[0].weather[0].icon === "13d") {
        oneDayLaterIcon.src = "./assets/imgs/snow.svg";
      } else if (data.daily[0].weather[0].icon === "50d") {
        oneDayLaterIcon.src = "./assets/imgs/mist.svg";
      }
      oneDayLaterIcon.style.opacity = "1";
      oneDayLaterWind.innerHTML = data.daily[0].wind_speed + " MPH";
      oneDayLaterHumidity.innerHTML = data.daily[0].humidity + "%";

      // Two days later
      twoDaysLaterTemp.innerHTML = data.daily[1].temp.day + "&deg;F";
      if (data.daily[1].weather[0].icon === "01d") {
        twoDaysLaterIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.daily[1].weather[0].icon === "02d") {
        twoDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.daily[1].weather[0].icon === "03d") {
        twoDaysLaterIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.daily[1].weather[0].icon === "04d") {
        twoDaysLaterIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.daily[1].weather[0].icon === "09d") {
        twoDaysLaterIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.daily[1].weather[0].icon === "10d") {
        twoDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.daily[1].weather[0].icon === "11d") {
        twoDaysLaterIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.daily[1].weather[0].icon === "13d") {
        twoDaysLaterIcon.src = "./assets/imgs/snow.svg";
      } else if (data.daily[1].weather[0].icon === "50d") {
        twoDaysLaterIcon.src = "./assets/imgs/mist.svg";
      }
      twoDaysLaterIcon.style.opacity = "1";
      twoDaysLaterWind.innerHTML = data.daily[1].wind_speed + " MPH";
      twoDaysLaterHumidity.innerHTML = data.daily[1].humidity + "%";

      // Three days later
      threeDaysLaterTemp.innerHTML = data.daily[2].temp.day + "&deg;F";
      if (data.daily[2].weather[0].icon === "01d") {
        threeDaysLaterIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.daily[2].weather[0].icon === "02d") {
        threeDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.daily[2].weather[0].icon === "03d") {
        threeDaysLaterIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.daily[2].weather[0].icon === "04d") {
        threeDaysLaterIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.daily[2].weather[0].icon === "09d") {
        threeDaysLaterIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.daily[2].weather[0].icon === "10d") {
        threeDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.daily[2].weather[0].icon === "11d") {
        threeDaysLaterIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.daily[2].weather[0].icon === "13d") {
        threeDaysLaterIcon.src = "./assets/imgs/snow.svg";
      } else if (data.daily[2].weather[0].icon === "50d") {
        threeDaysLaterIcon.src = "./assets/imgs/mist.svg";
      }
      threeDaysLaterIcon.style.opacity = "1";
      threeDaysLaterWind.innerHTML = data.daily[2].wind_speed + " MPH";
      threeDaysLaterHumidity.innerHTML = data.daily[2].humidity + "%";

      // Four days later
      fourDaysLaterTemp.innerHTML = data.daily[3].temp.day + "&deg;F";
      if (data.daily[3].weather[0].icon === "01d") {
        fourDaysLaterIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.daily[3].weather[0].icon === "02d") {
        fourDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.daily[3].weather[0].icon === "03d") {
        fourDaysLaterIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.daily[3].weather[0].icon === "04d") {
        fourDaysLaterIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.daily[3].weather[0].icon === "09d") {
        fourDaysLaterIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.daily[3].weather[0].icon === "10d") {
        fourDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.daily[3].weather[0].icon === "11d") {
        fourDaysLaterIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.daily[3].weather[0].icon === "13d") {
        fourDaysLaterIcon.src = "./assets/imgs/snow.svg";
      } else if (data.daily[3].weather[0].icon === "50d") {
        fourDaysLaterIcon.src = "./assets/imgs/mist.svg";
      }
      fourDaysLaterIcon.style.opacity = "1";
      fourDaysLaterWind.innerHTML = data.daily[3].wind_speed + " MPH";
      fourDaysLaterHumidity.innerHTML = data.daily[3].humidity + "%";

      // Five days later
      fiveDaysLaterTemp.innerHTML = data.daily[4].temp.day + "&deg;F";
      if (data.daily[4].weather[0].icon === "01d") {
        fiveDaysLaterIcon.src = "./assets/imgs/clear-day.svg";
      } else if (data.daily[4].weather[0].icon === "02d") {
        fiveDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day.svg";
      } else if (data.daily[4].weather[0].icon === "03d") {
        fiveDaysLaterIcon.src = "./assets/imgs/cloudy.svg";
      } else if (data.daily[4].weather[0].icon === "04d") {
        fiveDaysLaterIcon.src = "./assets/imgs/overcast.svg";
      } else if (data.daily[4].weather[0].icon === "09d") {
        fiveDaysLaterIcon.src = "./assets/imgs/overcast-rain.svg";
      } else if (data.daily[4].weather[0].icon === "10d") {
        fiveDaysLaterIcon.src = "./assets/imgs/partly-cloudy-day-rain.svg";
      } else if (data.daily[4].weather[0].icon === "11d") {
        fiveDaysLaterIcon.src = "./assets/imgs/thunderstorms-extreme.svg";
      } else if (data.daily[4].weather[0].icon === "13d") {
        fiveDaysLaterIcon.src = "./assets/imgs/snow.svg";
      } else if (data.daily[4].weather[0].icon === "50d") {
        fiveDaysLaterIcon.src = "./assets/imgs/mist.svg";
      }
      fiveDaysLaterIcon.style.opacity = "1";
      fiveDaysLaterWind.innerHTML = data.daily[4].wind_speed + " MPH";
      fiveDaysLaterHumidity.innerHTML = data.daily[4].humidity + "%";
    })
    .catch((error) => {
      alert("Could not get weather data for this city");
    });
}

// set click handlers and get long and lat from city name
function setHandlers() {
  const searchHistoryBtns = document.querySelectorAll(".parameters button");

  for (let i = 0; i < searchHistoryBtns.length; i++) {
    const el = searchHistoryBtns[i];

    if (i === 0) {
      el.addEventListener("click", function () {
        let input = searchInput.value;
        if (input !== "") {
          city = input;
          getCoord();
          searchInput.value = "";
        } else {
          alert("Please enter a city");
        }
      });
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          let input = searchInput.value;
          if (input !== "") {
            city = input;
            getCoord();
            searchInput.value = "";
          } else {
            alert("Please enter a city");
          }
        }
      });
    } else {
      el.addEventListener("click", function () {
        city = el.innerHTML;
        getCoord();
      });
    }
  }
}

// get coordinates from city to pass to api
function getCoord() {
  let queryURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      latitude = data[0].lat;
      longitude = data[0].lon;
      updateWeather();
    })
    .catch((error) => {
      alert("Could not get coordinates for this city");
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Cannot get user location");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  updateWeather();

  let queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&exclude=hourly,minutely&units=imperial&appid=" +
    APIKey;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Today
      selectedCity.innerHTML = city + " (" + today + ")";
    })
    .catch((error) => {
      alert("Could not get weather data for this city");
    });
}

function fadeIn() {
  const main = document.querySelector("main");

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      main.classList.add("show");
    }, 750);
  });
}

getUserLocation();
getStoredCities();
fadeIn();