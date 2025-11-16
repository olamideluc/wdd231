// ===== Footer Updates =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===== Fetch Members =====
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  const container = document.getElementById("members");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("business-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" />
      <h3>${member.name}</h3>
      <p class="tagline">${member.description}</p>
      <ul>
        <li><strong>Address:</strong> ${member.address}</li>
        <li><strong>Phone:</strong> ${member.phone}</li>
        <li><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></li>
        <li><strong>Membership Level:</strong> ${formatMembership(member.membershipLevel)}</li>
      </ul>
    `;
    container.appendChild(card);
  });
}

function formatMembership(level) {
  switch(level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

// ===== View Toggle =====
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

function setView(view) {
  if (view === "grid") {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  } else {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  }
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// ===== Initialize =====
loadMembers();
