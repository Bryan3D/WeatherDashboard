const citiesLt =$("#cities-lt");
const cities = [];
const WeatherKey = "2a5629dbd76c990d83e5d8e2cf6fe7c6";


// Get the cities from the API

const citiesGet = async () => {
    const response = await fetch(
        "https://raw.githubusercontent.com/attainu/attainu-eagle/master/city.list.json"
    );
    const data = await response.json();
    return data;
    };

// Get the weather data from the API

const getWeather = async (cityId) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${WeatherKey}`
    );
    const data = await response.json();
    return data;
    };

    

// Get the cities from the API

const getCities = async () => {
    const response = await fetch(
        "https://raw.githubusercontent.com/attainu/attainu-eagle/master/city.list.json"
    );
    const data = await response.json();
    return data;
    };


// fetch the cities and weather data

const fetchCities = async () => {
    const cities = await getCities();
    const weather = await getWeather();
    console.log(cities);
    console.log(weather);
    };

//  local storage

const saveCities = () => {
    localStorage.setItem("cities", JSON.stringify(cities));
    };

//button click event

const addCity = (city) => {
    const cityEl = $(`<li class="list-group-item list-group-item-action">${city}</li>`);
    citiesLt.append(cityEl);
    };

    // init function

    const init = () => {
    const storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities) {
        cities.push(...storedCities);
    }
    cities.forEach((city) => addCity(city));
    };

    init();




