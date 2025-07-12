console.log("Grocery Grid loaded ✨");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    console.log("clicked");
    navMenu.classList.toggle("active");
  });
});
