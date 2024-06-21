document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const dropdownMenu = document.getElementById('menu-dropdown');

  menuBtn.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (event) => {
      if (!menuBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.style.display = 'none';
      }
  });

  document.querySelectorAll('.dropdown-menu > li > a').forEach(menuItem => {
      menuItem.addEventListener('click', (event) => {
          event.preventDefault();
          const submenu = menuItem.nextElementSibling;
          if (submenu && submenu.classList.contains('submenu')) {
              submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          }
      });
  });

  document.querySelectorAll('.color').forEach(color => {
      color.addEventListener('click', function () {
          const product = this.closest('.product');
          const imageElement = product.querySelector('img');
          const newImage = this.getAttribute('data-image');
          imageElement.src = newImage;
          product.querySelector('.color.selected')?.classList.remove('selected');
          this.classList.add('selected');
      });
  });

  document.querySelectorAll('.size').forEach(size => {
      size.addEventListener('click', function () {
          const product = this.closest('.product');
          product.querySelector('.size.selected')?.classList.remove('selected');
          this.classList.add('selected');
      });
  });
});

function addToCart(name, price, image, productId) {
  const product = document.getElementById(productId);
  const selectedColorElement = product.querySelector('.color.selected');
  const selectedSizeElement = product.querySelector('.size.selected');

  if (!selectedColorElement || !selectedSizeElement) {
      alert('Veuillez sélectionner une couleur et une taille.');
      return;
  }

  const selectedColor = selectedColorElement.style.backgroundColor;
  const selectedSize = selectedSizeElement.dataset.size;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const productIndex = cart.findIndex(item => item.name === name && item.color === selectedColor && item.size === selectedSize);
  if (productIndex !== -1) {
      cart[productIndex].quantity++;
  } else {
      cart.push({
          name: name,
          price: price,
          image: image,
          color: selectedColor,
          size: selectedSize,
          quantity: 1
      });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} a été ajouté au panier`);
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
