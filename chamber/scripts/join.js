document.addEventListener("DOMContentLoaded", () => {
  // Footer Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Footer Last Modified
  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }

  // Timestamp Injection
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal Handling
  document.querySelectorAll(".card a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modal = document.querySelector(link.getAttribute("href"));
      if (modal) modal.style.display = "block";
    });
  });

  document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Thank You Page Population
  const params = new URLSearchParams(window.location.search);
  const fields = ["firstName", "lastName", "email", "phone", "organization", "timestamp"];
  fields.forEach(field => {
    const el = document.getElementById(field);
    if (el) el.textContent = params.get(field) || "";
  });
});
