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
                  <button onclick="removeFromCart('${item.name}')">Retirer</button>
              </div>
          `;
          cartItemsContainer.appendChild(cartItemElement);

          totalPrice += parseFloat(item.price.replace(' Dh', '')) * item.quantity;
      });

      document.getElementById('total-price').textContent = `Total: ${totalPrice} Dh`;
  }
});

// Function to remove product from the cart
window.removeFromCart = function(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const productIndex = cart.findIndex(item => item.name === name);
  if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
          // If quantity is greater than 1, decrease the quantity
          cart[productIndex].quantity--;
      } else {
          // If quantity is 1, remove the product from cart
          cart.splice(productIndex, 1);
      }
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload(); // Refresh the page to reflect changes in the cart
}
