let url =
  "http://api.openweathermap.org/data/2.5/forecast?q=Kharkiv&lang=eng&units=metric&appid=d0ed0dfd52fbbc4ad3fa8b43ce38d6a5";

axios.get(url).then((res) => {
  const forecastData = res.data.list;
  console.log(forecastData);

  document.querySelector(".city").innerHTML = res.data.city.name;

  const groupedForecast = {};
  forecastData.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const dayKey = date.toDateString();
    if (!groupedForecast[dayKey]) {
      groupedForecast[dayKey] = [];
    }
    groupedForecast[dayKey].push(day);
  });

  for (const dayKey in groupedForecast) {
    const dayData = groupedForecast[dayKey];
    const firstDay = dayData[0];

    const date = new Date(firstDay.dt * 1000);
    const weekday = date.toLocaleDateString("en", { weekday: "long" });
    const icon = firstDay.weather[0].icon;
    const temp = firstDay.main.temp;
    const humidity = firstDay.main.humidity;
    const windSpeed = firstDay.wind.speed;

    const forecastRow = document.createElement("div");
    forecastRow.classList.add("forecast-row");
    forecastRow.innerHTML = `
            <div class="day">${weekday}</div>
            <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather"></div>
            <div class="temp">${temp}°C</div>
            <div class="humidity">${humidity}%</div>
            <div class="wind">${windSpeed} km/h</div>
        `;

    document.querySelector(".forecast").appendChild(forecastRow);
  }
});
