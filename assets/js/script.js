console.log("Grocery Grid loaded ✨");

// --- GLOBAL QUOTE CART ---
// Load cart from sessionStorage on page load, or start with an empty array
let quoteItems = JSON.parse(sessionStorage.getItem('quoteCart')) || [];

// --- GLOBAL UI UPDATE FUNCTION ---
// This function updates the cart count in the navbar. It can run on any page.
function updateQuoteCartUI() {
    const quoteCartCount = document.getElementById('quoteCartCount');
    if (quoteCartCount) {
        quoteCartCount.textContent = quoteItems.length;
        if (quoteItems.length > 0) {
            quoteCartCount.classList.add('visible');
        } else {
            quoteCartCount.classList.remove('visible');
        }
    }
}

// --- NAVBAR & CART REDIRECT LOGIC ---
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
      hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
      });
  }

  // Update the cart UI as soon as any page loads
  updateQuoteCartUI();

  const quoteCartBtn = document.getElementById('quoteCartBtn');
  if (quoteCartBtn) {
      quoteCartBtn.addEventListener('click', () => {
        if (quoteItems.length === 0) {
            alert('Your quote cart is empty. Please add items from our product catalogue.');
            return;
        }

        const quoteModal = document.getElementById('quoteModalOverlay');
        if (quoteModal) {
            quoteModal.classList.add('active');
        } else {
            // Redirect to products.html and tell it to open the modal
            window.location.href = 'products.html#show-quote';
        }
      });
  }
});

// --- CLIENTS CAROUSEL LOGIC ---
// This logic should be outside DOMContentLoaded to avoid issues if elements don't exist
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
  let currentIndex = 0;
  const track = document.querySelector('.carousel-track');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');
  let totalClients = document.querySelectorAll('.client').length;

  function getVisibleClients() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateArrows() {
    const visible = getVisibleClients();
    const maxIndex = totalClients - visible;
    if (!leftArrow || !rightArrow) return;
    leftArrow.style.display = currentIndex > 0 ? 'block' : 'none';
    rightArrow.style.display = currentIndex < maxIndex ? 'block' : 'none';
  }

  function moveSlide(direction) {
    const visible = getVisibleClients();
    const maxIndex = totalClients - visible;
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (!track) return;
    const offset = currentIndex * (100 / visible);
    track.style.transform = `translateX(-${offset}%)`;
    updateArrows();
  }

  window.addEventListener('resize', () => { moveSlide(0); });
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => moveSlide(-1));
    rightArrow.addEventListener('click', () => moveSlide(1));
  }
  updateArrows();
}

// ========== PRODUCT PAGE-ONLY LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
    const productCatalogue = document.querySelector('.product-catalogue');
    if (!productCatalogue) return; // Stop if not on products page

    // --- ELEMENT SELECTION ---
    const searchInput = document.getElementById('productSearch');
    const productCards = document.querySelectorAll('.main-product');
    const mainProductsContainer = document.querySelector('.main-products');
    const productModalOverlay = document.getElementById('productModalOverlay');
    const modalTitle = document.getElementById('modal-title');
    const modalItemsList = document.getElementById('modal-items-list');
    const addToQuoteBtn = document.getElementById('addToQuoteBtn');
    const quoteModalOverlay = document.getElementById('quoteModalOverlay');
    const quoteSelectedItems = document.getElementById('quote-selected-items');
    const hiddenSelectedItems = document.getElementById('hidden-selected-items');
    const allCloseButtons = document.querySelectorAll('.modal-close');
    
    // Also update form fields any time the cart UI is updated
    function populateQuoteFormFields() {
        const itemsText = quoteItems.join(', ');
        if(quoteSelectedItems) quoteSelectedItems.textContent = itemsText;
        if(hiddenSelectedItems) hiddenSelectedItems.value = itemsText;
    }

    mainProductsContainer.addEventListener('click', (e) => {
        const productCard = e.target.closest('.main-product');
        if (!productCard) return;
        const productName = productCard.dataset.product;
        const itemsString = productCard.dataset.items;
        const itemsArray = itemsString.split(',');
        modalTitle.textContent = `${productName} Varieties`;
        modalItemsList.innerHTML = '';
        itemsArray.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox" value="${item.trim()}" name="product-item"> ${item.trim()}</label>`;
            modalItemsList.appendChild(li);
        });
        productModalOverlay.classList.add('active');
    });

    addToQuoteBtn.addEventListener('click', () => {
        const selectedCheckboxes = modalItemsList.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one item to add.');
            return;
        }
        selectedCheckboxes.forEach(checkbox => {
            const item = checkbox.value;
            if (!quoteItems.includes(item)) {
                quoteItems.push(item);
            }
        });

        // Save the updated cart to sessionStorage
        sessionStorage.setItem('quoteCart', JSON.stringify(quoteItems));

        updateQuoteCartUI();
        populateQuoteFormFields();
        closeModal();
        alert('Items added to your quote!');
    });
    
    function closeModal() {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }

    allCloseButtons.forEach(button => button.addEventListener('click', closeModal));
    productModalOverlay.addEventListener('click', (e) => { if (e.target === productModalOverlay) closeModal(); });
    quoteModalOverlay.addEventListener('click', (e) => { if (e.target === quoteModalOverlay) closeModal(); });

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

    // Check if we need to auto-open the modal on page load
    if (window.location.hash === '#show-quote') {
        if (quoteItems.length > 0) {
            populateQuoteFormFields();
            quoteModalOverlay.classList.add('active');
            // Optional: remove the hash from the URL so it doesn't stay there
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }
    
    // Populate form fields on initial load of products page too
    populateQuoteFormFields();
});