console.log("Grocery Grid loaded ✨");

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      console.log("clicked ✅");
      navMenu.classList.toggle("active");
    });
  } else {
    console.warn("❌ navMenu or hamburger not found in DOM");
  }
});
