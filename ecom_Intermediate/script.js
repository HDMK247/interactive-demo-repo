// script.js

const products = [
    { id: 1, name: 'Laptop', price: 800, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 500, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 50, category: 'Accessories' },
    { id: 4, name: 'T-Shirt', price: 20, category: 'Clothing' },
    { id: 5, name: 'Shoes', price: 100, category: 'Clothing' }
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function displayProducts(filteredProducts = products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
  
    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  
  displayProducts();
  
  // Filter products by search and price
  function filterProducts() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value);
    const maxPrice = parseFloat(document.getElementById('max-price').value);
  
    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(searchQuery) &&
        product.price >= minPrice && product.price <= maxPrice;
    });
  
    displayProducts(filteredProducts);
  }
  



// =========part 2==========

 
  // Add products to the cart with quantity handling
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
  
  // Update the cart display and total
  function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    // Update cart item count
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  
    // Clear current cart items
    cartItemsContainer.innerHTML = '';
  
    // Display each product in the cart
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price} x ${item.quantity} <button onclick="removeFromCart(${index})">Remove</button></p>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="decreaseQuantity(${index})">-</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total}`;
  }
  
  updateCart();
  
  // Increase product quantity in cart
  function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  // Decrease product quantity in cart
  function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  // Remove a product from the cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  


//   ====== Part 3 ===========

function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    alert("Checkout successful! Thank you for your purchase.");
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
  }
  