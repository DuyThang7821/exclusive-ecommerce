document.addEventListener("DOMContentLoaded", () => {
  const showMessage = (targetId, message) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.textContent = message;
    target.classList.remove("d-none");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Registration form
  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage("registrationMessage", "Account created successfully. Welcome to Exclusive!");
      registrationForm.reset();
    });
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage("loginMessage", "You are now signed in. Redirecting to your dashboard...");
    });
  }

  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = icon.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
      }
    });
  });

  // Cart calculations
  const cartTable = document.getElementById("cartTable");
  const updateCartTotals = () => {
    let subtotal = 0;
    document.querySelectorAll("[data-cart-row]").forEach((row) => {
      const price = Number(row.dataset.price);
      const qty = Number(row.querySelector(".qty-input").value) || 1;
      const lineTotal = price * qty;
      row.querySelector("[data-line-total]").textContent = lineTotal.toFixed(2);
      subtotal += lineTotal;
    });
    const tax = subtotal * 0.05;
    document.getElementById("cartSubtotal")?.setAttribute("data-value", subtotal.toFixed(2));
    document.getElementById("cartSubtotal")?.replaceChildren(document.createTextNode(subtotal.toFixed(2)));
    document.getElementById("cartTax")?.replaceChildren(document.createTextNode(tax.toFixed(2)));
    document.getElementById("cartTotal")?.replaceChildren(document.createTextNode((subtotal + tax).toFixed(2)));
  };

  if (cartTable) {
    updateCartTotals();
    cartTable.addEventListener("input", (event) => {
      if (event.target.classList.contains("qty-input")) {
        updateCartTotals();
      }
    });
  }

  // Payment method selection
  const paymentButtons = document.querySelectorAll("[data-payment-method]");
  const paymentMethodInput = document.getElementById("paymentMethodInput");
  paymentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      paymentButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      if (paymentMethodInput) {
        paymentMethodInput.value = button.dataset.paymentMethod;
      }
      document.getElementById("cardDetails")?.classList.toggle("d-none", button.dataset.paymentMethod !== "card");
    });
  });

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      showMessage("paymentMessage", "Thank you! Your order has been placed successfully.");
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage("contactMessage", "Thanks for reaching out! We will reply within 24 hours.");
      contactForm.reset();
    });
  }

  // Product gallery
  const mainProductImage = document.getElementById("mainProductImage");
  const thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((item) => item.classList.remove("active"));
      thumb.classList.add("active");
      if (mainProductImage) {
        mainProductImage.src = thumb.dataset.image;
      }
    });
  });

  // Quantity selector on product details
  const quantityInput = document.getElementById("detailQuantity");
  document.querySelectorAll("[data-qty-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!quantityInput) return;
      const current = Number(quantityInput.value) || 1;
      if (button.dataset.qtyAction === "increment") {
        quantityInput.value = current + 1;
      } else if (current > 1) {
        quantityInput.value = current - 1;
      }
    });
  });

  // Tabs on product details
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => content.classList.toggle("active", content.id === target));
      tab.classList.add("active");
    });
  });

  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const qtyValue = quantityInput ? quantityInput.value : 1;
      alert(`Added ${qtyValue} item(s) to cart!`);
    });
  }

  const buyNowBtn = document.getElementById("buyNowBtn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const qtyValue = quantityInput ? quantityInput.value : 1;
      window.location.href = "payment.html";
    });
  }

  // Quantity selector functionality for new design
  const minusBtn = document.querySelector('.minus-btn');
  const plusBtn = document.querySelector('.plus-btn');
  const quantityValue = document.querySelector('.quantity-value');
  
  if (minusBtn && plusBtn && quantityValue) {
    minusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityValue.textContent);
      if (currentValue > 1) {
        quantityValue.textContent = currentValue - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityValue.textContent);
      quantityValue.textContent = currentValue + 1;
    });
  }

  // ===================================================================
  // PRODUCT CARD CLICK HANDLER - DYNAMIC PRODUCT LOADING
  // ===================================================================
  
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on action icons or add to cart button
      if (
        e.target.closest('.action-icon') || 
        e.target.closest('.add-to-cart-btn') ||
        e.target.classList.contains('add-to-cart-btn')
      ) {
        return;
      }
      
      // Get product data from the card
      const productData = {
        name: card.querySelector('h6')?.textContent || 'Product Name',
        price: card.querySelector('.text-danger')?.textContent.split('$')[1]?.split(' ')[0] || '0',
        oldPrice: card.querySelector('.text-decoration-line-through')?.textContent.replace('$', '') || '',
        image: card.querySelector('img')?.src || '',
        discount: card.querySelector('.discount-badge')?.textContent || '',
        rating: card.querySelectorAll('.fas.fa-star:not(.text-muted)').length || 5,
        reviews: card.querySelector('.text-muted:last-child')?.textContent.match(/\d+/)?.[0] || '0'
      };
      
      // Save to localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      
      // Navigate to product details page
      window.location.href = 'product-details.html';
    });
  });
  
  // Prevent action icons from triggering card click
  const actionIcons = document.querySelectorAll('.action-icon');
  actionIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Action icon clicked');
    });
  });
  
  // Prevent add to cart button from triggering card click
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // ===================================================================
  // LOAD PRODUCT DATA ON PRODUCT DETAILS PAGE
  // ===================================================================
  
  // Check if we're on the product details page
  if (window.location.pathname.includes('product-details.html')) {
    const productData = localStorage.getItem('selectedProduct');
    
    if (productData) {
      const product = JSON.parse(productData);
      
      // Update product name
      const productTitle = document.querySelector('.product-info h2');
      if (productTitle) {
        productTitle.textContent = product.name;
      }
      
      // Update price
      const priceElement = document.querySelector('.product-info h2:nth-of-type(2)');
      if (priceElement) {
        priceElement.textContent = `$${product.price}`;
      }
      
      // Update main image and thumbnails
      const mainImage = document.getElementById('mainProductImage');
      if (mainImage) {
        mainImage.src = product.image;
      }
      
      const thumbImages = document.querySelectorAll('.thumb img');
      thumbImages.forEach(thumb => {
        thumb.src = product.image;
        thumb.parentElement.dataset.image = product.image;
      });
      
      // Update discount badge if exists
      if (product.discount) {
        const discountBadge = document.querySelector('.discount-badge');
        if (discountBadge) {
          discountBadge.textContent = product.discount;
        }
      }
      
      // Update rating stars
      const ratingContainer = document.querySelector('.text-warning');
      if (ratingContainer) {
        ratingContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('i');
          star.className = i < product.rating ? 'fas fa-star' : 'fas fa-star text-muted';
          ratingContainer.appendChild(star);
        }
      }
      
      // Update review count
      const reviewText = document.querySelector('.text-muted');
      if (reviewText && product.reviews) {
        reviewText.innerHTML = `(${product.reviews} Reviews) | <span style="color: #00FF66;">In Stock</span>`;
      }
    }
  }
});
