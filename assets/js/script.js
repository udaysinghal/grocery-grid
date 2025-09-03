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
// First, check if the main carousel container exists on the page.
const carouselContainer = document.querySelector('.carousel-container');

// Only run the rest of the code IF the carouselContainer was found.
if (carouselContainer) {
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
}


// ========== MODAL, SEARCH, AND FORM LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {

    // ========== SEARCH BAR LOGIC ==========
    const searchInput = document.getElementById('productSearch');
    const productCards = document.querySelectorAll('.main-product');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const items = card.dataset.items.toLowerCase();
                if (title.includes(searchTerm) || items.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ========== NEW: GOOGLE FORM SUBMISSION LOGIC ==========
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the form from submitting the old way

            // PASTE YOUR GOOGLE FORM URL HERE
            const formActionURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeY0aDGg7ZczkJ1qZUaM7YsEi5yRXOBPNUTTEURCCbBxktSzw/formResponse'; 

            const formData = new FormData(quoteForm);

            fetch(formActionURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Important: This prevents a CORS error
            })
            .then(() => {
                // Success!
                document.getElementById('quoteModalOverlay').classList.remove('active'); // Close the modal
                quoteForm.reset(); // Clear the form fields
                alert('Thank you! Your quote request has been sent successfully.');
            })
            .catch(error => {
                // Handle errors
                console.error('Error submitting form:', error);
                alert('Oops! Something went wrong. Please try again.');
            });
        });
    }

    // ========== MODAL DISPLAY LOGIC (Existing Code) ==========
    // Select all necessary elements
    const mainProductsContainer = document.querySelector('.main-products');
    
    // Product Modal Elements
    const productModalOverlay = document.getElementById('productModalOverlay');
    const modalTitle = document.getElementById('modal-title');
    const modalItemsList = document.getElementById('modal-items-list');
    const getQuoteBtn = document.getElementById('getQuoteBtn');

    // Quote Modal Elements
    const quoteModalOverlay = document.getElementById('quoteModalOverlay');
    const quoteSelectedItems = document.getElementById('quote-selected-items');
    const hiddenSelectedItems = document.getElementById('hidden-selected-items');

    // Close buttons for both modals
    const allCloseButtons = document.querySelectorAll('.modal-close');

    // --- Function to open the Product Details Modal ---
    if (mainProductsContainer) {
      mainProductsContainer.addEventListener('click', (e) => {
        const productCard = e.target.closest('.main-product');
        if (!productCard) return;

        // Get data from the clicked card's data-attributes
        const productName = productCard.dataset.product;
        const itemsString = productCard.dataset.items;
        const itemsArray = itemsString.split(',');

        // Populate the modal
        modalTitle.textContent = `${productName} Varieties`;
        modalItemsList.innerHTML = ''; // Clear previous items

        itemsArray.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
            <label>
              <input type="checkbox" value="${item.trim()}" name="product-item">
              ${item.trim()}
            </label>
          `;
          modalItemsList.appendChild(li);
        });

        // Show the modal
        productModalOverlay.classList.add('active');
      });
    }

    // --- Function to handle "Get a Quote" button click ---
    if (getQuoteBtn) {
      getQuoteBtn.addEventListener('click', () => {
        const selectedCheckboxes = modalItemsList.querySelectorAll('input[type="checkbox"]:checked');
        
        if (selectedCheckboxes.length === 0) {
          alert('Please select at least one item to get a quote.');
          return;
        }

        const selectedItems = Array.from(selectedCheckboxes).map(cb => cb.value);

        // Populate the quote form
        quoteSelectedItems.textContent = selectedItems.join(', ');
        hiddenSelectedItems.value = selectedItems.join(', '); // For form submission

        // Hide product modal and show quote modal
        productModalOverlay.classList.remove('active');
        quoteModalOverlay.classList.add('active');
      });
    }
    
    // --- Function to close any active modal ---
    function closeModal() {
      document.querySelector('.modal-overlay.active')?.classList.remove('active');
    }

    allCloseButtons.forEach(button => {
      button.addEventListener('click', closeModal);
    });

    // Also close modal if overlay is clicked
    if (productModalOverlay) productModalOverlay.addEventListener('click', (e) => {
      if (e.target === productModalOverlay) closeModal();
    });
    if (quoteModalOverlay) quoteModalOverlay.addEventListener('click', (e) => {
      if (e.target === quoteModalOverlay) closeModal();
    });
});