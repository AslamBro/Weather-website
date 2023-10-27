const api ={
    key: '51ffa629d24fdcd9cba0382a35ae62e3',
    baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', setQuery)

function setQuery(e) {
  if (e.keyCode == 13){
      getResults(searchBox.value)
    console.log(searchBox.value);
  }  
}

function getResults(query) {
   fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
   .then(weather => {
   return weather.json();
  })
     .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city')
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.temp')
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span`
  
  let weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${weather.main.temp_min}°C`
}

function dateBuilder(a) {
  let months = ['Januariy', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let day = days[a.getDay()];
  let date = a.getDate();
  let month = months[a.getMonth()];
  let year = a.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

