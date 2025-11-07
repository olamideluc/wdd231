const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
