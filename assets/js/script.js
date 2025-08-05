console.log("Grocery Grid loaded ✨");

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    console.log("clicked ✅");
    navMenu.classList.toggle("active");
  });
});


// for clients
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
let totalClients = document.querySelectorAll('.client').length;

function getVisibleClients() {
  if (window.innerWidth <= 480) return 1; // Mobile
  if (window.innerWidth <= 768) return 2; // Tablet
  return 3; // Desktop
}

function updateArrows() {
  const visible = getVisibleClients();
  const maxIndex = totalClients - visible;

  leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
  rightArrow.style.display = currentIndex < maxIndex ? 'block' : 'none';
}

function moveSlide(direction) {
  const visible = getVisibleClients();
  const maxIndex = totalClients - visible;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const offset = currentIndex * (100 / visible);
  track.style.transform = `translateX(-${offset}%)`;

  updateArrows();
}

window.addEventListener('resize', () => {
  moveSlide(0); // Recalculate on resize
});

// Initialize
updateArrows();
