



// Initialize cart (use localStorage or an array to store data)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listener to "Add to cart" buttons
document.querySelectorAll('.to').forEach((button, index) => {
  button.addEventListener('click', () => {
    const product = {
      name: `Product ${index + 1}`,
      price: 390, // Replace with dynamic data
      quantity: 1,
      image: `pictures/cs${index + 1}.jpg`,
    };
    addToCart(product);
  });
});

// Add product to cart
function addToCart(product) {
  const exists = cart.find(item => item.name === product.name);
  if (exists) {
    exists.quantity++;
  } else {
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Load cart items dynamically
function loadCart() {
  const table = document.getElementById('cart-items');
  table.innerHTML = ''; // Clear existing rows

  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td><img src="${item.image}" width="50" height="50"></td>
      <td>${item.name}</td>
      <td>GHS ${item.price}</td> <!-- Changed $ to GHS -->
      <td><input type="number" value="${item.quantity}" data-index="${index}" class="quantity"></td>
      <td>GHS ${(item.price * item.quantity).toFixed(2)}</td> <!-- Changed $ to GHS -->
      <td><button data-index="${index}" class="remove">Remove</button></td>
    `;
    subtotal += item.price * item.quantity;
  });

  document.getElementById('subtotal').innerText = `Subtotal: GHS ${subtotal.toFixed(2)}`; // Update subtotal
}

// Handle quantity change
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('quantity')) {
    const index = event.target.dataset.index;
    cart[index].quantity = parseInt(event.target.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
});

// Handle remove button
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
});

// Load cart when page loads
window.onload = loadCart;

document.addEventListener('input', (event) => {
  if (event.target.classList.contains('quantity')) {
    const index = event.target.dataset.index;
    const quantity = Math.max(1, parseInt(event.target.value) || 1); // Minimum quantity is 1
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
});
