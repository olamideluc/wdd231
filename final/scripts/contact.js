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

  // Form and Modal
  const form = document.getElementById("form");
  const modal = document.getElementById("confirmationModal");
  const closeModal = document.getElementById("closeModal");
  const feedback = document.getElementById("formFeedback");
  const modalMessage = document.getElementById("modalMessage");
  const modalSpinner = document.getElementById("modalSpinner");

  if (form) {
    form.addEventListener("submit", (event) => {
      // Let browser validate required fields
      if (!form.checkValidity()) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = "Please fill out all required fields.";
        }
        return;
      }

      // Hybrid flow: show modal briefly, then redirect
      if (modal && closeModal) {
        event.preventDefault(); // stop default navigation
        modal.showModal();
        closeModal.focus();

        // Update modal message and show spinner
        if (modalMessage) {
          modalMessage.textContent = "Redirecting… Please wait.";
        }
        if (modalSpinner) {
          modalSpinner.style.display = "block";
        }

        // Build URLSearchParams from form data
        const formData = new FormData(form);
        const params = new URLSearchParams(formData);

        // After 2 seconds, close modal and redirect
        setTimeout(() => {
          modal.close();
          if (modalSpinner) {
            modalSpinner.style.display = "none";
          }
          window.location.href = `form-action.html?${params.toString()}`;
        }, 2000);
      }
    });
  }

  if (modal && closeModal) {
    closeModal.addEventListener("click", () => {
      modal.close();
      form.reset();
      if (modalSpinner) {
        modalSpinner.style.display = "none";
      }
      if (modalMessage) {
        modalMessage.textContent = "Thank you for contacting us. Your message has been submitted successfully.";
      }
    });

    // Trap focus inside modal for accessibility
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        closeModal.focus();
      }
      if (event.key === "Escape") {
        modal.close();
      }
    });

    // Allow Enter key to close modal
    closeModal.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        modal.close();
        form.reset();
        if (modalSpinner) {
          modalSpinner.style.display = "none";
        }
        if (modalMessage) {
          modalMessage.textContent = "Thank you for contacting us. Your message has been submitted successfully.";
        }
      }
    });
  }
});
