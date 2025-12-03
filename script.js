document.addEventListener("DOMContentLoaded", () => {
  const showMessage = (targetId, message) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.textContent = message;
    target.classList.remove("d-none");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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
      
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
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
});
