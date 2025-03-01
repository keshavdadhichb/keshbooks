let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-details">
                <h4>${book.title}</h4>
                <p>By ${book.author}</p>
            </div>
            <span class="item-price">₹${book.price.toFixed(2)}</span>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += book.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    const removedBook = cart[index];
    cart.splice(index, 1);
    updateCart();
    showToast(`${removedBook.title} removed from cart!`);
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('checkout').addEventListener('click', () => {
    showToast('Checkout process initiated!');
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});