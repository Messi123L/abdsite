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
}

function removeFromCart(name, color, size) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.name === name && item.color === color && item.size === size);

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

function sendWhatsApp(event) {
  event.preventDefault();

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let cartDetails = '';

  cartItems.forEach(item => {
      cartDetails += `\n- ${item.name} (${item.price} MAD) x ${item.quantity} (Couleur: ${item.color}, Taille: ${item.size})`;
  });

  const email = document.getElementById('email').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const postalCode = document.getElementById('postalCode').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  const shipping = document.getElementById('shipping').value;

  const message = `Nouvelle commande:
Adresse e-mail: ${email}
Prénom: ${firstName}
Nom: ${lastName}
Adresse: ${address}
Code postal: ${postalCode}
Ville: ${city}
Téléphone: ${phone}
Mode d'expédition: ${shipping}
Articles dans le panier:${cartDetails}`;

  const whatsappURL = `https://wa.me/212642293138?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

const form = document.getElementById('orderForm');
if (form) {
  form.addEventListener('submit', sendWhatsApp);
}
