function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10){
        hours=`0${hours}`;
    }
    let minutes =date.getMinutes();
    if (minutes < 10){
        minutes=`0${minutes}`;
    }
    let days = ["Sunday","Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday" ];
    let day =days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}
function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML=`<div class="row">`;
    let daysForecast=["Sun.","Mon.","Tue.","Wen.","Thu.", "Fri.", "Sat."];
    daysForecast.forEach(function(day){
    forecastHTML=forecastHTML + `
            <div class="col-2 forecast-col">
                <div class="weather-forescast-date">${day}</div> 
                    <img src="http://openweathermap.org/img/wn/50d@2x.png" 
                    alt="" 
                    id=""
                    class="weather-forescast-img"
                    width="50"/>
                    <div class="weather-forescast-temperature">
                    <span class="weather-forescast-temperature-max">15˚</span>
                    <span class="weather-forescast-temperature-min">10˚</span>
                </div> 
            </div>`;
    })
    forecastHTML=forecastHTML +`</div>`;
    forecastElement.innerHTML=forecastHTML;
}
function getForecast(coordinates){
    console.log(coordinates);
    let apiKey= "445aeda78e9f65ae9c133e75be3fe412";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response){
    let temperatureElement=document.querySelector("#temperature");
    let locationElement=document.querySelector("#city");
    let descriptionElement= document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celciusTemperature=response.data.main.temp;

    temperatureElement.innerHTML=Math.round(celciusTemperature);
    locationElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description );

    getForecast(response.data.coord);
}
function search(city){
    let apiKey="445aeda78e9f65ae9c133e75be3fe412";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature=(celciusTemperature * 9)/5+32;
    let temperatureElement=document.querySelector("#temperature");
    //remove the active calls to the celsius link
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    //add the active link to the fahrenheit
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celciusTemperature);
}

let celciusTemperature = null;
search ("Toronto");

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


// 1 Add html and CSS for forescast 
// 2 Add API call to get forescast 
// 3 Replace the dyummy content with real data