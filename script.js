document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // Product Data
  // -----------------------
  const products = [
    { name: "Product 1", id: 1, price: 29.67 },
    { name: "Product 2", id: 2, price: 78.9 },
    { name: "Product 3", id: 3, price: 34.56 },
  ];

  // -----------------------
  // DOM Elements
  // -----------------------
  const productList = document.querySelector("#products-list");
  const cartItems = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#empty-cart-msg");
  const cartSummary = document.querySelector("#cart-summary");
  const cartTotalPriceDisplay = document.querySelector("#cart-total-price");
  const checkoutBtn = document.querySelector("#checkout-button");
  const clearAllBtn = document.querySelector("#clear-all");

  // -----------------------
  // Cart Initialization
  // -----------------------
  let cart = JSON.parse(localStorage.getItem("Products")) || [];
  renderCart();

  // -----------------------
  // Render Product List
  // -----------------------
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}" class="add-to-cart-Btn">Add to cart</button>
      <button class="remove-btn" data-id="${product.id}">Remove ${product.name}</button>
    `;
    productList.appendChild(productDiv);
  });

  // -----------------------
  // Event Delegation for Add/Remove Buttons
  // -----------------------
  productList.addEventListener("click", (e) => {
    const target = e.target;

    // Add to Cart
    if (target.classList.contains("add-to-cart-Btn")) {
      const productID = parseInt(target.getAttribute("data-id"));
      const productToAdd = products.find((p) => p.id === productID);
      addToCart(productToAdd);
    }

    // Remove from Cart
    if (target.classList.contains("remove-btn")) {
      const productID = parseInt(target.getAttribute("data-id"));
      const productToRemove = products.find((p) => p.id === productID);
      const productDiv = target.closest(".products");
      removeFromCart(productToRemove, productDiv);
    }
  });

  // -----------------------
  // Functions
  // -----------------------
  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function removeFromCart(product, targetDiv) {
    cart = cart.filter((p) => p.id !== product.id);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartSummary.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
      });

      cartTotalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartSummary.classList.add("hidden");
      cartTotalPriceDisplay.textContent = `$0.00`;
    }
  }

  function saveCart() {
    localStorage.setItem("Products", JSON.stringify(cart));
  }

  // -----------------------
  // Checkout & Clear All
  // -----------------------
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Please add at least one product to checkout");
    } else {
      cart = [];
      saveCart();
      alert("Checkout successful!");
      renderCart();
    }
  });

  clearAllBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });
});
