// Remplacez par votre propre clé API de OpenWeatherMap
const API_KEY = "df3ce2b03e8f62cfb4a9b25b62fe436a";  
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
let city =" Paris"
 

// Fonction pour récupérer les données météorologiques
async function getWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);

    // Vérification si la réponse est valide
    if (!response.ok) {
      throw new Error("Ville non trouvée ou erreur de requête !");
    }

    const data = await response.json();
    console.log("Données météo : ", data);

    // Mettre à jour l'interface avec les données récupérées
    updateWeatherUI(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
    alert("Désolé, nous n'avons pas pu récupérer les données météo.");
  }
}

// Fonction pour mettre à jour le DOM avec les informations météorologiques
function updateWeatherUI(data) {
  // Mise à jour des informations météo dans le DOM
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temperature").textContent = `${data.main.temp}°C`;
  document.getElementById("description").textContent = data.weather[0].description;
  
  // Mise à jour de l'icône météo
  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
}

// Gestionnaire d'événement pour le bouton de recherche
document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value; // Récupère la ville entrée par l'utilisateur
  if (city) {
    getWeather(city);  // Appelle la fonction pour récupérer la météo
  } else {
    alert("Veuillez entrer une ville.");
  }
});
