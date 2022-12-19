const citiesLt =$("#cities-lt");
const cities = [];
const WeatherKey = "fc8bffadcdca6a94d021c093eac22797";

//Format for day
function FormatDay(date){
   let date = new Date();
    console.log(date);
   let month = date.getMonth()+1;
   let day = date.getDate();
    
   let dayOutput = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayOutput;
}



//Calling function init();
init();

//Function init();
function init(){
    //Get stored cities from localStorage
    //Parsing the JSON string to an object
   let storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
        cities = storedCities;
      }
    // Render cities to the DOM
    renderCities();
    // console.log(cities);
}

//Function StoreCities()
function storeCities(){
   // Stringify and set "cities" WeatherKey in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

//Function renderCities()
function renderCities() {
    // Clear citiesLt element
    // citiesLt.text = "";
    // citiesLt.HTML = "";
    citiesLt.empty();
    
    // Render a new li for each city
    for (var i = 0; i < cities.length; i++) {
     let city = cities[i];
      
     let li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      citiesLt.prepend(li);
    }
    //Get Response weather for the first city only
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   

  //When form is submitted...
  $("#add-city").on("click", function(event){
      event.preventDefault();

    // This line will grab the city from the input box
   let city = $("#city-input").val().trim();
    
    // Return from function early if submitted city is blank
    if (city === "") {
        return;
    }
    //Adding city-input to the city array
    cities.push(city);
    // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
  });

  //Function get Response Weather 
  
  function getResponseWeather(cityName){
   let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + WeatherKey; 

    //Clear content of today-weather
    $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
      // Create a new table row element
      cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
      $("#today-weather").append(cityTitle);
     let TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
     let cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#today-weather").append(cityTemperature);
     let cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
     let cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
     let CoordLon = response.coord.lon;
     let CoordLat = response.coord.lat;
    
        //Api to get UV index
       let queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ WeatherKey+ "&lat=" + CoordLat +"&lon=" + CoordLon;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseuv) {
           let cityUV = $("<span>").text(responseuv.value);
           let cityUVp = $("<p>").text("UV Index: ");
            cityUVp.append(cityUV);
            $("#today-weather").append(cityUVp);
            console.log(typeof responseuv.value);
            if(responseuv.value > 0 && responseuv.value <=2){
                cityUV.attr("class","green")
            }
            else if (responseuv.value > 2 && responseuv.value <= 5){
                cityUV.attr("class","yellow")
            }
            else if (responseuv.value >5 && responseuv.value <= 7){
                cityUV.attr("class","orange")
            }
            else if (responseuv.value >7 && responseuv.value <= 10){
                cityUV.attr("class","red")
            }
            else{
                cityUV.attr("class","purple")
            }
        });
    
        //Api to get 5-day forecast  
       let queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + WeatherKey;
            $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function(response5day) { 
            $("#boxes").empty();
            console.log(response5day);
            for(var i=0, j=0; j<=5; i=i+6){
               let read_date = response5day.list[i].dt;
                if(response5day.list[i].dt != response5day.list[i+1].dt){
                   let FivedayDiv = $("<div>");
                    FivedayDiv.attr("class","col-3 m-2 bg-primary")
                   let d = new Date(0); // The 0 there is the WeatherKey, which sets the date to the epoch
                    d.setUTCSeconds(read_date);
                   let date = d;
                    console.log(date);
                   let month = date.getMonth()+1;
                   let day = date.getDate();
                   let dayOutput = date.getFullYear() + '/' +
                    (month<10 ? '0' : '') + month + '/' +
                    (day<10 ? '0' : '') + day;
                   let Fivedayh4 = $("<h6>").text(dayOutput);
                    //Set src to the imags
                   let imgtag = $("<img>");
                   let skyconditions = response5day.list[i].weather[0].main;
                    if(skyconditions==="Clouds"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                   let pTemperatureK = response5day.list[i].main.temp;
                    console.log(skyconditions);
                   let TempetureToNum = parseInt((pTemperatureK)* 9/5 - 459);
                   let pTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
                   let pHumidity = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
                    FivedayDiv.append(Fivedayh4);
                    FivedayDiv.append(imgtag);
                    FivedayDiv.append(pTemperature);
                    FivedayDiv.append(pHumidity);
                    $("#boxes").append(FivedayDiv);
                    console.log(response5day);
                    j++;
                }
            
        }
      
    });
      

    });
    
  }

  //Click function to each Li 
  $(document).on("click", "#listC", function() {
   let thisCity = $(this).attr("data-city");
    getResponseWeather(thisCity);
  });


    
  
  
    



  





