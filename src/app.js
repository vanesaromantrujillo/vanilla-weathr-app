function displayTemperature(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let locationElement=document.querySelector("#city");
    locationElement.innerHTML=response.data.name;
    //let prepElement=document.querySelector("#prep");
   //prepElement=response.data.
   let descriptionElement= document.querySelector("#description");
   descriptionElement.innerHTML=response.data.weather[0].description;

   let feelsElement=document.querySelector("#feels");
   feelsElement.innerHTML=Math.round(response.data.main.feels_like);
   
   let humidityElement=document.querySelector("#humidity");
   humidityElement.innerHTML=response.data.main.humidity;

   let windElement=document.querySelector("#wind");
   windElement.innerHTML=Math.round(response.data.wind.speed);
   
}

let apiKey="445aeda78e9f65ae9c133e75be3fe412";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
