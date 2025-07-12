// assets/js/script.js
console.log("Grocery Grid loaded ✨");

// Future feature: toggle nav on mobile or extra animations here

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.navbar nav ul');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});
