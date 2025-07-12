console.log("Grocery Grid loaded ✨");

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    console.log("clicked ✅");
    navMenu.classList.toggle("active");
  });
});
