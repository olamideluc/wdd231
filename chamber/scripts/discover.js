import { itemsOfInterest } from "../data/discover.mjs";

// ===== Footer Updates =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===== Visitor Message =====
const visitorMessage = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    visitorMessage.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitorMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitorMessage.textContent = `You last visited ${days} days ago.`;
  }
}
localStorage.setItem("lastVisit", now);

// ===== Build Cards =====
const grid = document.querySelector(".discover-grid");

itemsOfInterest.forEach(item => {
  const card = document.createElement("article");
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button class="learn-more">Learn More</button>
  `;
  grid.appendChild(card);
});
