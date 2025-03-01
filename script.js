const books = [
    { id: 1, title: "NCERT Science Class 10", author: "NCERT", genre: "NCERT", price: 185, description: "Comprehensive science textbook for Class 10 students.", rating: 4.5 },
    { id: 2, title: "NCERT Mathematics Class 12", author: "NCERT", genre: "NCERT", price: 215, description: "Advanced mathematics textbook for Class 12 students.", rating: 4.8 },
    { id: 3, title: "CBSE Physics Class 11", author: "CBSE", genre: "CBSE", price: 250, description: "Complete physics textbook for CBSE Class 11 students.", rating: 4.6 },
    { id: 4, title: "Maharashtra Board History Class 9", author: "State Board", genre: "State Board", price: 175, description: "History textbook for Maharashtra State Board Class 9 students.", rating: 4.3 },
    { id: 5, title: "Indian Polity", author: "M. Laxmikanth", genre: "Reference", price: 750, description: "Comprehensive guide on Indian Polity for UPSC aspirants.", rating: 4.7 },
    { id: 6, title: "Objective General English", author: "S.P. Bakshi", genre: "Competitive Exams", price: 395, description: "English language guide for various competitive exams.", rating: 4.4 },
    { id: 7, title: "NCERT Hindi Class 8", author: "NCERT", genre: "NCERT", price: 165, description: "Hindi literature and language textbook for Class 8 students.", rating: 4.2 },
    { id: 8, title: "CBSE Economics Class 12", author: "CBSE", genre: "CBSE", price: 230, description: "Economics textbook for CBSE Class 12 students.", rating: 4.5 },
    { id: 9, title: "Indian Art and Culture", author: "Nitin Singhania", genre: "Reference", price: 595, description: "Comprehensive guide on Indian art and culture for UPSC and other competitive exams.", rating: 4.6 },
    { id: 10, title: "Quantitative Aptitude for Competitive Examinations", author: "R.S. Aggarwal", genre: "Competitive Exams", price: 675, description: "Essential guide for quantitative aptitude in various competitive exams.", rating: 4.8 }
];

const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const searchBtn = document.getElementById('search-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const toast = document.getElementById('toast');

let cart = [];

function displayBooks(booksToDisplay = books) {
    bookList.innerHTML = '';
    booksToDisplay.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p class="price">₹${book.price.toFixed(2)}</p>
            <div class="rating">
                ${getStarRating(book.rating)}
            </div>
            <p>${book.description}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookList.appendChild(bookElement);
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
        (${rating})
    `;
}

function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    cart.push(book);
    updateCartCount();
    showToast(`${book.title} added to cart!`);
    saveCartToLocalStorage();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredBooks = books.filter(book => 
        (book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)) &&
        (category === '' || book.genre === category)
    );

    displayBooks(filteredBooks);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

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

searchBtn.addEventListener('click', filterBooks);
searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    loadCartFromLocalStorage();
});