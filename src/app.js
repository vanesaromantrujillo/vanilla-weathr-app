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
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    let days = ["Sunday","Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday" ];
    let day =days[date.getDay()];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let month=months[date.getMonth()];
    let dateM=date.getDate();
    return `${day}, ${month} ${dateM}, ${hours}:${minutes}${ampm}`;
}
function getIcon(icon) {
  let iconElement = "";
  if (icon === "03d" || icon === "03n") {
    iconElement = "src/icons/03d.png";
  } else if (icon === "04d") {
    iconElement = "src/icons/04d.png";
  } else if (icon === "04n") {
    iconElement = "src/icons/04n.png";
  } else if (icon === "01d") {
    iconElement = "src/icons/01d.png";
  } else if (icon === "01n") {
    iconElement = "src/icons/01n.png";
  } else if (icon === "02d") {
    iconElement = "src/icons/02d.png";
  } else if (icon === "02n") {
    iconElement = "src/icons/02n.png";
  } else if (icon === "09d") {
    iconElement = "src/icons/09d.png";
  } else if (icon === "09n") {
    iconElement = "src/icons/09n.png";
  } else if (icon === "10d") {
    iconElement = "src/icons/10d.png";
  } else if (icon === "10n") {
    iconElement = "src/icons/10n.png";
  } else if (icon === "13d") {
    iconElement = "src/icons/13d.png";
  } else if (icon === "13n") {
    iconElement = "src/icons/13n.png";
  } else if (icon === "50d") {
    iconElement = "src/icons/50d.png";
  } else if (icon === "50n") {
    iconElement = "src/icons/50n.png";
  }
  return iconElement;
}
function happyDay(timestamp){
    let date = new Date(timestamp);
    let happydays = ["Sunday","Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday" ];
    let dayhappy = happydays[date.getDay()];
    if (dayhappy==="Monday"){
        return`“Success is the sum of small efforts repeated day in and day out.” 
        <i>—Robert Collier </i>`;
    } else if (dayhappy==="Tuesday"){
        return`“Go as far as you can see; when you get there, you’ll be able to see further.” 
        <i>—Thomas Carlyle</i>`;
    } else if (dayhappy==="Wenesday"){
        return`“Don’t count the days, make the days count.” 
        <i>—Muhammad Ali</i>`;
    } else if (dayhappy==="Thursday"){
        return`“The best preparation for tomorrow is doing your best today.” 
        <i>—H. Jackson Brown</i>`;
    } else if (dayhappy==="Friday"){
        return`Happy ${dayhappy}, enjoy your weekend 😎`;
    } else if (dayhappy==="Saturday"){
        return`Happy ${dayhappy}, enjoy your weekend 😎`;
    }
    else{
        return `Enjoy your ${dayhappy} 🙂`;
    }
}

function dayPrediction(timestamp){
    let date= new Date(timestamp *1000);
    let day = date.getDay();
    let days = ["Sun.","Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    return days[day];
}
function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row">`;

    forecast.forEach(function(forecastDay, index){
        if (index < 6){
    forecastHTML=forecastHTML + `
            <div class="col-2 col-xs-2 forecast-col">
                <div class="weather-forescast-date">${dayPrediction(forecastDay.dt)}</div> 
                    <img 
                    src="${getIcon(forecastDay.weather[0].icon)}"
                    alt="" 
                    id=""
                    class="weather-forescast-img"
                    width="50"/>
                    <div class="weather-forescast-temperature">
                    <span class="weather-forescast-temperature-max">${Math.round(forecastDay.temp.max)}˚</span>
                    <span class="weather-forescast-temperature-min">${Math.round(forecastDay.temp.min)}˚</span>
                </div> 
            </div>`;
            }
    })
    forecastHTML=forecastHTML +`</div>`;
    forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
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
    let feelsElement=document.querySelector("#feels");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    let happyElement=document.querySelector("#happy");

    celciusTemperature=response.data.main.temp;

    temperatureElement.innerHTML=Math.round(celciusTemperature);
    locationElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    feelsElement.innerHTML=Math.round(response.data.main.feels_like);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    happyElement.innerHTML=happyDay(response.data.dt*1000);
    iconElement.setAttribute("src", getIcon(response.data.weather[0].icon));
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
// Geolocation

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "445aeda78e9f65ae9c133e75be3fe412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", getPosition);

search ("Toronto");

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

//function displayFahrenheitTemperature(event){
//    event.preventDefault();
//    let fahrenheitTemperature=(celciusTemperature * 9)/5+32;
//    let temperatureElement=document.querySelector("#temperature");
//    //remove the active calls to the celsius link
//    celsiusLink.classList.remove("active");
//    fahrenheitLink.classList.add("active");
//    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
//}
//function displayCelsiusTemperature(event){
//    event.preventDefault();
//    let temperatureElement=document.querySelector("#temperature");
//    //add the active link to the fahrenheit
//    celsiusLink.classList.add("active");
//    fahrenheitLink.classList.remove("active");
//    temperatureElement.innerHTML=Math.round(celciusTemperature);
//}
// Icon

