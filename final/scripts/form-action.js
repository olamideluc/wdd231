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

  // Parse URL Search Params
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const email = params.get("email");
  const message = params.get("message");

  const resultsContainer = document.getElementById("results");

  // Helper function to render results
  function renderResults(data) {
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <p><strong>Name:</strong> ${data.name || "Not provided"}</p>
        <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
        <p><strong>Message:</strong> ${data.message || "Not provided"}</p>
      `;
    }
  }

  // If new submission exists, save to localStorage
  if (name || email || message) {
    const submission = { name, email, message };
    localStorage.setItem("lastSubmission", JSON.stringify(submission));
    renderResults(submission);
  } else {
    // If no new submission, check localStorage
    const saved = localStorage.getItem("lastSubmission");
    if (saved) {
      const submission = JSON.parse(saved);
      renderResults(submission);
    } else if (resultsContainer) {
      resultsContainer.textContent = "No form submission data found.";
    }
  }

  // Clear Saved Submission button
  const clearBtn = document.getElementById("clearSubmission");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("lastSubmission");
      if (resultsContainer) {
        resultsContainer.textContent = "Saved submission cleared.";
      }
    });
  }
});
