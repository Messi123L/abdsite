document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();

          // Collect and process form data for order submission
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
  window.sendWhatsApp = function() {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let cartDetails = '';

      cartItems.forEach(item => {
          cartDetails += `\n- ${item.name} (${item.price})`;
      });

      const message = `Nouvelle commande:
Adresse e-mail: ${document.getElementById('email').value}
Articles dans le panier:${cartDetails}`;

      const whatsappURL = `https://wa.me/212642293138?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault();

          const email = document.getElementById('email').value;
          const firstName = document.getElementById('firstName').value;
          const lastName = document.getElementById('lastName').value;
          const address = document.getElementById('address').value;
          const postalCode = document.getElementById('postalCode').value;
          const city = document.getElementById('city').value;
          const phone = document.getElementById('phone').value;
          const country = document.getElementById('country').value;
          const shipping = document.getElementById('shipping').value;
          
          const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
          let cartDetails = '';

          cartItems.forEach(item => {
              cartDetails += `\n- ${item.name} (${item.price})`;
          });

          const message = `Nouvelle commande de ${firstName} ${lastName}:
Email: ${email}
Téléphone: ${phone}
Adresse: ${address}, ${postalCode}, ${city}, ${country}
Mode d'expédition: ${shipping}
Articles dans le panier:${cartDetails}`;

          const whatsappURL = `https://wa.me/212642293138?text=${encodeURIComponent(message)}`;
          window.open(whatsappURL, '_blank');
      });
  }

  // Autres fonctions...
});
