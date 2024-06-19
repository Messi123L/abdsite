document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  let totalPrice = 0;

  if (cartItemsContainer) {
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h2>${item.name}</h2>
          <p>${item.price}</p>
          <div class="quantity-control">
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
            <input type="number" value="${item.quantity}" min="1" readonly>
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
          </div>
          <button onclick="removeFromCart('${item.name}')">Retirer</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);

      totalPrice += parseFloat(item.price.replace(' Dh', '')) * item.quantity;
    });

    document.getElementById('total-price').textContent = `Total: ${totalPrice} Dh`;
  }
});

window.updateQuantity = function(name, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.name === name);

  if (productIndex !== -1) {
    cart[productIndex].quantity += change;
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

window.removeFromCart = function(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.name === name);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
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
        <p>${item.price}</p>
        <div class="quantity-control">
          <button onclick="updateQuantity('${item.name}', -1)">-</button>
          <input type="number" value="${item.quantity}" min="1" readonly>
          <button onclick="updateQuantity('${item.name}', 1)">+</button>
        </div>
        <button onclick="removeFromCart('${item.name}')">Retirer</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);

    totalPrice += parseFloat(item.price.replace(' Dh', '')) * item.quantity;
  });

  document.getElementById('total-price').textContent = `Total: ${totalPrice} Dh`;
}
