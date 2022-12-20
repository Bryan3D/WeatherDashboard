const weather = {
    "apiKey":"105179e2ff6654aeb72f470eca7ba2d8",
    fetchWeather: function(city){
        fetch( "https://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&units=standard&appid="
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = 
        "Weather in " 
        + name;
        document.querySelector(".icon").src 
        = "https://openweathermap.org/img/wn/"
        + icon + ".png";
        document.querySelector(".description").innerText 
        =   description;
        document.querySelector(".temp").innerText
         = temp + "°C";
        document.querySelector(".humidity").innerText 
        = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText 
        = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading"); 
    },

}