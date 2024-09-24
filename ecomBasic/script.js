// script.js

// Example products array
const products = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Headphones', price: 50 },
    { id: 4, name: 'Desktop', price: 1200 },
    { id: 5, name: 'HP Monitor', price: 1000 },
    { id: 6, name: 'Monitor', price: 9000 }
  ];
  
  // Empty cart array
  let cart = [];
  
  // Function to display products dynamically
  function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
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
  
  // Call the function to render products
  displayProducts();
  




  
  // Function to add a product to the cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
  
    updateCart();
  }
  
  // Function to update cart display and total
  function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    // Update cart item count
    cartCount.textContent = cart.length;
  
    // Clear current cart items
    cartItemsContainer.innerHTML = '';
  
    // Display each product in the cart
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total}`;
  }
  
  // Function to remove a product from the cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
