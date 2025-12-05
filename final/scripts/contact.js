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

  // Modal confirmation
  const form = document.getElementById("form");
  const modal = document.getElementById("confirmationModal");
  const closeModal = document.getElementById("closeModal");

  if (form && modal && closeModal) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission
      modal.showModal();
      closeModal.focus(); // move focus to close button for accessibility
    });

    closeModal.addEventListener("click", () => {
      modal.close();
      form.reset();
    });

    // Trap focus inside modal for accessibility
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        closeModal.focus(); // keep focus inside modal
      }
      if (event.key === "Escape") {
        modal.close(); // allow closing with Escape key
      }
    });
  }
});
