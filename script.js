
const products = [
    {
        id: 1,
        name: 'Ноутбук MaiBenBen',
        price: 89990,
        image: 'images/laptop.jpg',
        description: 'Мощный ноутбук для работы и игр'
    },
    {
        id: 2,
        name: 'Наушники AirPods Pro',
        price: 24990,
        image: 'images/airpods.jpg',
        description: 'Беспроводные наушники с шумоподавлением'
    },
    {
        id: 3,
        name: 'Игровая консоль PlayStation 5',
        price: 59990,
        image: 'images/ps5.jpg',
        description: 'Новое поколение игровых консолей'
    },
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('totalAmount');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const closeOrder = document.getElementById('closeOrder');
const notification = document.getElementById('notification');


document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-placeholder" style="display: none;">📦</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Добавить в корзину
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Товар добавлен в корзину!');
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('Товар удален из корзины');
}


function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;


    renderCartItems();


    updateTotal();
}


function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Корзина пуста</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="cart-placeholder" style="display: none;">📦</div>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}


function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}


function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}


function showNotification(message) {
    const notificationContent = notification.querySelector('.notification-content span');
    notificationContent.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function setupEventListeners() {
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('show');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Корзина пуста!');
            return;
        }
        cartModal.classList.remove('show');
        orderModal.classList.add('show');
    });

    closeOrder.addEventListener('click', () => {
        orderModal.classList.remove('show');
    });


    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('show');
        }
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const orderData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: formData.get('address'),
            phone: formData.get('phone'),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            date: new Date().toISOString()
        };

        cart = [];
        saveCart();
        updateCartUI();
        
        orderModal.classList.remove('show');
        
        orderForm.reset();
        
        showNotification('Заказ создан!');
        
        console.log('Новый заказ:', orderData);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cartModal.classList.remove('show');
        orderModal.classList.remove('show');
    }
});

function demoAddProducts() {
    const demoProducts = [1, 2, 3];
    demoProducts.forEach((productId, index) => {
        setTimeout(() => {
            addToCart(productId);
        }, index * 500);
    });
}
