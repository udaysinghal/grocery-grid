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

// --- CATEGORY ICON FALLBACK HELPER ---
// Used on the products page. Once you drop a real image into
// assets/images/categories/<category-id>.png it'll be used automatically;
// until then it falls back to the emoji already defined in products-data.js.
function handleCategoryIconError(imgEl) {
    imgEl.onerror = null;
    const emoji = imgEl.dataset.emoji || '📦';
    const fallback = document.createElement('div');
    fallback.className = 'category-icon-fallback';
    fallback.textContent = emoji;
    imgEl.replaceWith(fallback);
}

// --- LOGO / IMAGE FALLBACK HELPER ---
// Used for brand & partner logos so a missing image (until you upload it)
// doesn't show a broken-image icon — it shows a clean initials badge instead.
function handleLogoError(imgEl, name) {
    imgEl.onerror = null;
    const initials = (name || '?')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
    const fallback = document.createElement('div');
    fallback.className = 'logo-fallback';
    fallback.textContent = initials;
    imgEl.replaceWith(fallback);
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
            populateQuoteFormFieldsGlobal();
        } else {
            // Redirect to products.html and tell it to open the modal
            window.location.href = 'products.html#show-quote';
        }
      });
  }
});

function populateQuoteFormFieldsGlobal() {
    const quoteSelectedItems = document.getElementById('quote-selected-items');
    const hiddenSelectedItems = document.getElementById('hidden-selected-items');
    const itemsText = quoteItems.join(', ');
    if (quoteSelectedItems) quoteSelectedItems.textContent = itemsText;
    if (hiddenSelectedItems) hiddenSelectedItems.value = itemsText;
}

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
    if (typeof productCategories === 'undefined') return; // data file missing

    // --- ELEMENT SELECTION ---
    const searchInput = document.getElementById('productSearch');
    const searchResultsBox = document.getElementById('searchAutocomplete');
    const mainProductsContainer = document.querySelector('.main-products');

    const productModalOverlay = document.getElementById('productModalOverlay');
    const modalBackBtn = document.getElementById('modalBackBtn');
    const modalTitle = document.getElementById('modal-title');
    const modalSearchInput = document.getElementById('modalSearchInput');
    const modalListBody = document.getElementById('modal-items-list');
    const addToQuoteBtn = document.getElementById('addToQuoteBtn');

    const quoteModalOverlay = document.getElementById('quoteModalOverlay');
    const allCloseButtons = document.querySelectorAll('.modal-close');

    // Modal navigation state
    // level: 'subcats' (list of subcategories) | 'items' (checklist of items)
    let modalState = { category: null, subcategory: null, level: null };

    // --- FLAT SEARCH INDEX (for the main autocomplete search) ---
    // Every individual item, tagged with where it lives, so a search for
    // "ghee" finds the item itself instead of just a category name.
    const searchIndex = [];
    productCategories.forEach(cat => {
        if (cat.comingSoon) return;
        if (cat.subcategories) {
            cat.subcategories.forEach(sub => {
                sub.items.forEach(item => {
                    searchIndex.push({ item, category: cat, subcategory: sub });
                });
            });
        } else {
            cat.items.forEach(item => {
                searchIndex.push({ item, category: cat, subcategory: null });
            });
        }
    });

    // --- RENDER CATEGORY CARDS ---
    function renderCategoryCards() {
        mainProductsContainer.innerHTML = '';
        productCategories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'main-product' + (cat.comingSoon ? ' coming-soon' : '');
            card.dataset.categoryId = cat.id;
            card.innerHTML = `
                <div class="category-icon">
                    <img src="assets/images/categories/${cat.id}.png" alt="${cat.name}" data-emoji="${cat.icon}" onerror="handleCategoryIconError(this)">
                </div>
                <h2>${cat.name}</h2>
                <p>${cat.comingSoon ? 'Coming soon' : 'Click to see varieties'}</p>
            `;
            if (!cat.comingSoon) {
                card.addEventListener('click', () => openCategory(cat));
            }
            mainProductsContainer.appendChild(card);
        });
    }

    // --- MODAL OPEN HELPERS ---
    function openCategory(cat) {
        modalState.category = cat;
        modalState.subcategory = null;
        if (cat.subcategories && cat.subcategories.length) {
            modalState.level = 'subcats';
            renderSubcategoryList();
        } else {
            modalState.level = 'items';
            renderItemChecklist(cat.items);
        }
        productModalOverlay.classList.add('active');
    }

    function openSubcategory(sub) {
        modalState.subcategory = sub;
        modalState.level = 'items';
        renderItemChecklist(sub.items);
    }

    function renderSubcategoryList(filterTerm = '') {
        modalTitle.textContent = modalState.category.name;
        modalBackBtn.style.display = 'none';
        modalSearchInput.value = '';
        modalSearchInput.placeholder = `🔍 Search within ${modalState.category.name}...`;
        addToQuoteBtn.style.display = 'none';

        const term = filterTerm.toLowerCase();
        const subs = modalState.category.subcategories.filter(s =>
            s.name.toLowerCase().includes(term) ||
            s.items.some(i => i.toLowerCase().includes(term))
        );

        modalListBody.innerHTML = '';
        modalListBody.className = 'modal-subcat-list';
        if (subs.length === 0) {
            modalListBody.innerHTML = '<li class="no-results">No matches found.</li>';
            return;
        }
        subs.forEach(sub => {
            const li = document.createElement('li');
            li.className = 'subcat-item';
            li.innerHTML = `<span>${sub.name}</span><span class="subcat-count">${sub.items.length} items ›</span>`;
            li.addEventListener('click', () => openSubcategory(sub));
            modalListBody.appendChild(li);
        });
    }

    function renderItemChecklist(items, filterTerm = '', highlightItem = null) {
        const canGoBack = modalState.category.subcategories && modalState.category.subcategories.length;

        if (modalState.subcategory) {
            // Category name is clickable when there's a parent level to return to
            modalTitle.innerHTML = canGoBack
                ? `<span class="breadcrumb-link" id="breadcrumbCategoryLink">${modalState.category.name}</span> <span class="breadcrumb-sep">›</span> ${modalState.subcategory.name}`
                : `${modalState.category.name} › ${modalState.subcategory.name}`;
            const breadcrumbLink = document.getElementById('breadcrumbCategoryLink');
            if (breadcrumbLink) {
                breadcrumbLink.addEventListener('click', () => {
                    modalState.subcategory = null;
                    modalState.level = 'subcats';
                    renderSubcategoryList();
                });
            }
        } else {
            modalTitle.textContent = modalState.category.name;
        }

        modalBackBtn.style.display = canGoBack ? 'inline-block' : 'none';
        modalSearchInput.placeholder = `🔍 Search items...`;
        addToQuoteBtn.style.display = 'block';

        const term = filterTerm.toLowerCase();
        const filtered = items.filter(i => i.toLowerCase().includes(term));

        modalListBody.innerHTML = '';
        modalListBody.className = '';
        if (filtered.length === 0) {
            modalListBody.innerHTML = '<li class="no-results">No matches found.</li>';
            return;
        }
        filtered.forEach(item => {
            const breadcrumb = [modalState.category.name, modalState.subcategory ? modalState.subcategory.name : null, item]
                .filter(Boolean).join(' › ');
            const li = document.createElement('li');
            const isHighlighted = highlightItem && item.toLowerCase() === highlightItem.toLowerCase();
            li.innerHTML = `<label class="${isHighlighted ? 'highlight-item' : ''}"><input type="checkbox" value="${breadcrumb.replace(/"/g, '&quot;')}" name="product-item" ${quoteItems.includes(breadcrumb) ? 'checked disabled' : ''}> ${item}</label>`;
            modalListBody.appendChild(li);
            if (isHighlighted) {
                setTimeout(() => li.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
            }
        });
    }

    // Modal search box filters whichever level is currently showing
    modalSearchInput.addEventListener('input', (e) => {
        const term = e.target.value;
        if (modalState.level === 'subcats') {
            renderSubcategoryList(term);
        } else {
            const items = modalState.subcategory ? modalState.subcategory.items : modalState.category.items;
            renderItemChecklist(items, term);
        }
    });

    modalBackBtn.addEventListener('click', () => {
        modalState.subcategory = null;
        modalState.level = 'subcats';
        renderSubcategoryList();
    });

    addToQuoteBtn.addEventListener('click', () => {
        const selectedCheckboxes = modalListBody.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');
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

        sessionStorage.setItem('quoteCart', JSON.stringify(quoteItems));

        updateQuoteCartUI();
        populateQuoteFormFieldsGlobal();
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

    // --- MAIN SEARCH BAR: live autocomplete over individual items ---
    function renderAutocomplete(term) {
        if (!term) {
            searchResultsBox.innerHTML = '';
            searchResultsBox.classList.remove('active');
            return;
        }
        const lower = term.toLowerCase();
        const matches = searchIndex.filter(entry => entry.item.toLowerCase().includes(lower)).slice(0, 8);

        if (matches.length === 0) {
            searchResultsBox.innerHTML = '<div class="autocomplete-empty">No products found. Try a different term.</div>';
            searchResultsBox.classList.add('active');
            return;
        }

        searchResultsBox.innerHTML = '';
        matches.forEach(match => {
            const row = document.createElement('div');
            row.className = 'autocomplete-row';
            const breadcrumb = match.subcategory ? `${match.category.name} › ${match.subcategory.name}` : match.category.name;
            row.innerHTML = `<span class="autocomplete-item-name">${match.item}</span><span class="autocomplete-breadcrumb">${breadcrumb}</span>`;
            row.addEventListener('click', () => {
                searchResultsBox.classList.remove('active');
                searchInput.value = '';
                modalState.category = match.category;
                modalState.subcategory = match.subcategory;
                modalState.level = 'items';
                const items = match.subcategory ? match.subcategory.items : match.category.items;
                renderItemChecklist(items, '', match.item);
                productModalOverlay.classList.add('active');
            });
            searchResultsBox.appendChild(row);
        });
        searchResultsBox.classList.add('active');
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderAutocomplete(e.target.value.trim()));
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResultsBox.contains(e.target)) {
                searchResultsBox.classList.remove('active');
            }
        });
    }

    // Initial render
    renderCategoryCards();

    // Check if we need to auto-open the quote modal on page load
    if (window.location.hash === '#show-quote') {
        if (quoteItems.length > 0) {
            populateQuoteFormFieldsGlobal();
            quoteModalOverlay.classList.add('active');
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }

    populateQuoteFormFieldsGlobal();
});
