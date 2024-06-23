document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function updateQuantity(name, color, size, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.name === name && item.color === color && item.size === size);

  if (productIndex !== -1) {
      cart[productIndex].quantity += change;
      if (cart[productIndex].quantity <= 0) {
          cart.splice(productIndex, 1);
      }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeFromCart(name, color, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.name === name && item.color === color && item.size === size);

  if (productIndex !== -1) {
      cart.splice(productIndex, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear existing items
  let totalPrice = 0;

  cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
              <h2>${item.name}</h2>
              <p>${item.price} MAD</p>
              <p>Couleur: ${item.color}</p>
              <p>Taille: ${item.size}</p>
              <div class="quantity-controls">
                  <button onclick="updateQuantity('${item.name}', '${item.color}', '${item.size}', -1)">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="updateQuantity('${item.name}', '${item.color}', '${item.size}', 1)">+</button>
              </div>
              <button onclick="removeFromCart('${item.name}', '${item.color}', '${item.size}')">Supprimer</button>
          </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      totalPrice += item.quantity * parseFloat(item.price);
  });

  const totalPriceElement = document.getElementById('total-price');
  if (totalPriceElement) {
      totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} MAD`;
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  document.getElementById('cart-count').innerText = cartCount;
}
