document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          sendWhatsApp(event); // Call sendWhatsApp function on form submission
      });
  }

  // Function to add products to the cart
  window.addToCart = function(name, price, image) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const productIndex = cart.findIndex(item => item.name === name);
      if (productIndex !== -1) {
          // If product already exists in cart, increase its quantity
          cart[productIndex].quantity++;
      } else {
          // If product doesn't exist in cart, add it
          cart.push({
              name: name,
              price: price,
              image: image,
              quantity: 1
          });
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} a été ajouté au panier`);
  }

  // Function to send order details via WhatsApp
  window.sendWhatsApp = function(event) {
      event.preventDefault(); // Prevent the form from submitting the default way
      
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let cartDetails = '';

      cartItems.forEach(item => {
          cartDetails += `\n- ${item.name} (${item.price}) x ${item.quantity}`;
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
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const dropdownMenu = document.getElementById('menu-dropdown');

  menuBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Hide dropdown if clicked outside
  document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

  // Toggle submenus
  document.querySelectorAll('.dropdown-menu > li > a').forEach(menuItem => {
    menuItem.addEventListener('click', (event) => {
      event.preventDefault();
      const submenu = menuItem.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
});

