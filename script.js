// API Key et URL de base de l'API OpenWeather
const APIKEY =df3ce2b03e8f62cfb4a9b25b62fe436a; // Remplacez par votre clé API OpenWeather
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fonction pour récupérer les données météo
async function fetchWeather(city) {
    try {
      // Construire l'URL avec la ville et la clé API
      const url = `${BASE_URL}?q=${city}&units=metric&lang=fr&appid=${APIKEY}`;
      
      // Envoyer une requête GET à l'API
      const response = await fetch(url);
      
      // Vérifier si la réponse est OK
      if (!response.ok) {
        throw new Error("Ville introuvable. Vérifiez le nom.");
      }
      
      // Extraire les données JSON
      const data = await response.json();
      console.log(data); // Debugging: voir les données dans la console
      
      // Mettre à jour le contenu HTML avec les données récupérées
      updateWeatherInfo(data);
    } catch (error) {
      alert(error.message);
    }
  }
  
  // Fonction pour mettre à jour le contenu HTML dynamiquement
  function updateWeatherInfo(data) {
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const weatherDescription = document.getElementById("weather-description");
    const weatherIcon = document.getElementById("icon");
  
    // Extraire les données pertinentes
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
  
  // Ajouter un gestionnaire d'événement au bouton de recherche
  document.getElementById("search-button").addEventListener("click", () => {
    const cityInput = document.getElementById("city-input").value.trim();
    
    if (cityInput) {
      fetchWeather(cityInput); // Appeler la fonction pour récupérer les données météo
    } else {
      alert("Veuillez entrer une ville.");
    }
  });