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
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let locationElement=document.querySelector("#city");
    locationElement.innerHTML=response.data.name;

   let descriptionElement= document.querySelector("#description");
   descriptionElement.innerHTML=response.data.weather[0].description;

   let feelsElement=document.querySelector("#feels");
   feelsElement.innerHTML=Math.round(response.data.main.feels_like);
   
   let humidityElement=document.querySelector("#humidity");
   humidityElement.innerHTML=response.data.main.humidity;

   let windElement=document.querySelector("#wind");
   windElement.innerHTML=Math.round(response.data.wind.speed);

   let dateElement=document.querySelector("#date");
   dateElement.innerHTML=formatDate(response.data.dt * 1000);

   let iconElement=document.querySelector("#icon");
   iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description );
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

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);