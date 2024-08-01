const apiKey = "469d38f8b4e1912d111c571011f8d860";
const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.getElementById("city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon img");

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response is not ok!");
        }
        const data = await response.json();
        console.log(data);
        updateWeatherData(data);
    } catch (err) {
        console.error(err);
    }
}

function updateWeatherData(data) {
    imgIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDataEle.querySelector(".temp").textContent = `${data.main.temp}°c`;
    weatherDataEle.querySelector(".desc").textContent = data.weather[0].description;
    weatherDataEle.querySelector(".details div:nth-child(1)").textContent = `Feels like: ${data.main.feels_like}°c`;
    weatherDataEle.querySelector(".details div:nth-child(2)").textContent = `Humidity: ${data.main.humidity}%`;
    weatherDataEle.querySelector(".details div:nth-child(3)").textContent = `Wind speed: ${data.wind.speed}m/s`;
}
