const apiKey = "df3ce2b03e8f62cfb4a9b25b62fe436a"; // Remplacez par votre clé API OpenWeatherMap
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&q=";

document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    
    if (city) {
        fetchWeather(city);
    } else {
        alert("Veuillez entrer une ville !");
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("Ville non trouvée !");
        }

        const data = await response.json();

        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("weather-description").textContent = data.weather[0].description;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        alert(error.message);
    }
}
