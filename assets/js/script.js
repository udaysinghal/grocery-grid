// assets/js/script.js
console.log("Grocery Grid loaded ✨");

// Future feature: toggle nav on mobile or extra animations here

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

