// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Responsive Navigation Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    // Initialize aria-expanded for accessibility
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
      const expanded = !navLinks.classList.contains("hidden");
      menuToggle.setAttribute("aria-expanded", expanded.toString());
    });
  }

  // Inject Last Modified Date
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }

  // Fetch Exchange Rates (example using a local JSON file)
  async function fetchRates() {
    try {
      const response = await fetch("data/rates.json"); // adjust path if needed
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const container = document.getElementById("rates-container");

      if (!container) return;

      container.innerHTML = "";

      // Display at least 15 items with 4 properties each
      data.rates.slice(0, 15).forEach(rate => {
        const rateCard = document.createElement("div");
        rateCard.classList.add("rate-card");
        rateCard.innerHTML = `
          <h3>${rate.currency}</h3>
          <p><strong>Buy:</strong> ${rate.buy}</p>
          <p><strong>Sell:</strong> ${rate.sell}</p>
          <p><small>Updated: ${new Date(rate.timestamp).toLocaleString()}</small></p>
        `;
        container.appendChild(rateCard);
      });
    } catch (error) {
      console.error("Error fetching rates:", error);
      const container = document.getElementById("rates-container");
      if (container) {
        container.textContent = "Unable to load exchange rates at this time.";
      }
    }
  }

  // Trigger fetch on button click
  const exchangeBtn = document.getElementById("exchange-btn");
  if (exchangeBtn) {
    exchangeBtn.addEventListener("click", fetchRates);
  }
});
