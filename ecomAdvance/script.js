// script.js

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function showLogin() {
  document.getElementById('auth-section').innerHTML = `
    <form onsubmit="login(event)">
      <input type="text" id="login-username" placeholder="Username" required>
      <input type="password" id="login-password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `;
}

function showSignUp() {
  document.getElementById('auth-section').innerHTML = `
    <form onsubmit="signUp(event)">
      <input type="text" id="signup-username" placeholder="Username" required>
      <input type="password" id="signup-password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
  `;
}

function signUp(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  if (users.some(user => user.username === username)) {
    alert('Username already exists');
    return;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Sign up successful!');
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Invalid credentials');
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  alert('Login successful!');
}








let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
const itemsPerPage = 3;

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts();
  });

function displayProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
      cartItemsContainer.innerHTML += `
        <p>${item.name} - $${item.price} x ${item.quantity}</p>
      `;
    });
  
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total}`;
  }
  
  function checkout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    alert('Checkout successful! Thank you for your purchase.');
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
  }
  