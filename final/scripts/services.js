document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
      const expanded = !navLinks.classList.contains("hidden");
      menuToggle.setAttribute("aria-expanded", expanded.toString());
    });
  }

  // Last Modified
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }

  // Fetch dynamic content (exchange history/tips)
  async function fetchServicesData() {
    try {
      const response = await fetch("data/services.json");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const container = document.getElementById("services-container");
      if (!container) return;
      container.innerHTML = "";

      data.items.slice(0, 15).forEach(item => {
        const card = document.createElement("div");
        card.classList.add("service-card");
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p><small>Updated: ${new Date(item.timestamp).toLocaleString()}</small></p>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching services data:", error);
      const container = document.getElementById("services-container");
      if (container) {
        container.textContent = "Unable to load services content at this time.";
      }
    }
  }

  // Trigger fetch on button click
  const servicesBtn = document.getElementById("services-btn");
  if (servicesBtn) {
    servicesBtn.addEventListener("click", fetchServicesData);
  }
});
