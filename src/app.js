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
}

let apiKey="445aeda78e9f65ae9c133e75be3fe412";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
