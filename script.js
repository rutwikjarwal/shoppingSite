const electronicsSection = document.querySelector('#electronics .products');
const homeAccessoriesSection = document.querySelector('#home-accessories .products');
const toysSection = document.querySelector('#toys .products');
const mobileSection = document.querySelector('#mobile .products');
const headphonesSection = document.querySelector('#headphones .products');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartCountSpan = document.getElementById('cart-count');
const checkoutButton = document.getElementById('checkout-button');

// Sample Product Data (Replace with your actual data)
const products = {
    electronics: [
        { id: 1, name: 'Smartphone', price: 699.99, image: 'smartphone.jpg', category: 'electronics' },
        { id: 2, name: 'Headphones', price: 99.99, image: 'headphones.jpg', category: 'electronics' },
        { id: 3, name: 'Smartwatch', price: 249.99, image: 'smartwatch.jpg', category: 'electronics' }
    ],
    homeAccessories: [
        { id: 4, name: 'Throw Pillow', price: 25.00, image: 'pillow.jpg', category: 'home-accessories' },
        { id: 5, name: 'Wall Art', price: 45.00, image: 'wallart.jpg', category: 'home-accessories' },
        { id: 6, name: 'Candle Set', price: 30.00, image: 'candles.jpg', category: 'home-accessories' }
    ],
    toys: [
        { id: 7, name: 'Action Figure', price: 15.00, image: 'actionfigure.jpg', category: 'toys' },
        { id: 8, name: 'Board Game', price: 35.00, image: 'boardgame.jpg', category: 'toys' },
        { id: 9, name: 'Plush Toy', price: 20.00, image: 'plushtoy.jpg', category: 'toys' }
    ],
    mobile: [
        { id: 10, name: 'Mobile X', price: 799.99, image: 'mobilex.jpg', category: 'mobile' },
        { id: 11, name: 'Mobile Y', price: 599.99, image: 'mobiley.jpg', category: 'mobile' }
    ],
    headphones: [
        { id: 12, name: 'Wireless Headphones', price: 129.99, image: 'wirelessheadphones.jpg', category: 'headphones' },
        { id: 13, name: 'Noise Cancelling Headphones', price: 199.99, image: 'noiseheadphones.jpg', category: 'headphones' }
    ]
};

let cart = [];

// Function to render products for a given category
function renderProducts(category, section) {
    products[category].forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
              <img src="cart.png" alt="Add to Cart">
              Add to Cart
            </button>
        `;
        section.appendChild(productDiv);
    });
}

// Function to add items to cart (modified to include category)
function addToCart(productId) {
    let product;
    for (const category in products) {
        product = products[category].find(p => p.id === productId);
        if (product) break;
    }

    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    }
}

// Function to update the cart display
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartTotalSpan.textContent = total.toFixed(2);
    cartCountSpan.textContent = itemCount;
}

// Function to remove items from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to load a section
function loadSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = 'block';

    if (!section.dataset.loaded) { // Check if section has already been loaded
      const sectionName = sectionId.replace('-', ''); // Remove hyphens for category name
      const sectionElement = document.querySelector(`#${sectionId} .products`);
      renderProducts(sectionName, sectionElement);
      section.dataset.loaded = true; // Mark as loaded
    }
}

// Event listener for checkout button (basic alert for now)
checkoutButton.addEventListener('click', () => {
    alert('Checkout functionality not implemented in this demo.');
});

// Initial render - load electronics by default
renderProducts('electronics', electronicsSection);

//Download: cart.png

//New Image Setup:  In addition to previous images, you need:
//mobilex.jpg, mobiley.jpg, wirelessheadphones.jpg, noiseheadphones.jpg
//place them to same directory