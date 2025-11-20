// ===== Footer Updates =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===== Weather Section =====
// Replace with your own OpenWeatherMap API key
const apiKey = "654f631d0cd52a14267b73b9ebb8fcb5";
const city = "Porto-Novo";
const countryCode = "BJ";

async function loadWeather() {
  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`
    );
    const currentData = await currentResponse.json();

    // 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`
    );
    const forecastData = await forecastResponse.json();

    const weatherDiv = document.getElementById("weather-info");

    // Current weather
    let html = `
      <p><strong>Current Temperature:</strong> ${currentData.main.temp} °C</p>
      <p><strong>Condition:</strong> ${currentData.weather[0].description}</p>
    `;

    // Forecast: pick next 3 days at noon
    const forecastDays = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12) {
        const day = date.toLocaleDateString(undefined, { weekday: "long" });
        if (!forecastDays[day]) {
          forecastDays[day] = item.main.temp;
        }
      }
    });

    const days = Object.keys(forecastDays).slice(0, 3);
    html += "<h3>3-Day Forecast</h3><ul>";
    days.forEach(day => {
      html += `<li>${day}: ${forecastDays[day]} °C</li>`;
    });
    html += "</ul>";

    weatherDiv.innerHTML = html;
  } catch (error) {
    console.error("Error loading weather:", error);
    document.getElementById("weather-info").textContent = "Weather data unavailable.";
  }
}

// ===== Spotlights Section =====
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter Gold (3) and Silver (2) members
    const eligible = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Randomize and pick 2–3
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const spotlights = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    const container = document.getElementById("featured-members");
    container.innerHTML = "";

    spotlights.forEach(member => {
      const card = document.createElement("article");
      card.classList.add("business-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" loading="lazy" />
        <h3>${member.name}</h3>
        <p class="tagline">${member.description}</p>
        <ul>
          <li><strong>Address:</strong> ${member.address}</li>
          <li><strong>Phone:</strong> ${member.phone}</li>
          <li><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></li>
          <li><strong>Membership Level:</strong> ${formatMembership(member.membershipLevel)}</li>
        </ul>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function formatMembership(level) {
  switch(level) {
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Member";
  }
}

// ===== Initialize Homepage =====
loadWeather();
loadSpotlights();
