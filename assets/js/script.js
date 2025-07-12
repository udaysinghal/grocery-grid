// assets/js/script.js
console.log("Grocery Grid loaded ✨");

// Future feature: toggle nav on mobile or extra animations here

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
});
hamburger.addEventListener("click", function () {
  console.log("clicked");
  navMenu.classList.toggle("active");
});