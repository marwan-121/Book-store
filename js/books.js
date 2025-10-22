const sampleBooks = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, rating: 4.5, category: "fiction" },
    { id: 2, title: "1984", author: "George Orwell", price: 8.99, rating: 4.7, category: "fiction" },
    { id: 3, title: "A Brief History of Time", author: "Stephen Hawking", price: 15.99, rating: 4.6, category: "science" },
    { id: 4, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", price: 12.99, rating: 4.8, category: "non-fiction" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 9.99, rating: 4.0, category: "fiction" },
    { id: 6, title: "Becoming", author: "Michelle Obama", price: 11.99, rating: 4.9, category: "biography" },
];
document.addEventListener("DOMContentLoaded", () => {
    const booksGrid = document.getElementById("books-grid");
    if (booksGrid) {
        loadFeaturedBooks();
    }                                        // Add event listeners to category cards
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", function() {
            const category = this.querySelector(".category-title").textContent.toLowerCase();
            filterBooksByCategory(category);
        });
    });
});
function loadFeaturedBooks() {
    const booksGrid = document.getElementById("books-grid");
    booksGrid.innerHTML = '';
    sampleBooks.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    const stars = generateStarRating(book.rating);
    card.innerHTML = `
        <div class="book-image">
            <i class="fas fa-book fa-3x"></i>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-rating">
                ${stars}
                <span>(${book.rating})</span>
            </div>
            <p class="book-price">$${book.price.toFixed(2)}</p>
            <button class="btn btn-primary btn-small add-to-cart" data-book-id="${book.id}">
                <i class="fas fa-cart-plus"></i>
                Add to Cart
            </button>
        </div>
    `;                                     // Add event listener to add to cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(book.id);
    });
    return card;
}
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let stars = '';                        // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }                                    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }                                    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function addToCart(bookId) {
    const book = sampleBooks.find(b => b.id === bookId);
    if (book) {                                                  // Update cart count
        const cartCount = document.querySelector(".cart-count");
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;            // Show success message
        showNotification(`Added "${book.title}" to cart!`);
    }
}
function filterBooksByCategory(category) {
    const booksGrid = document.getElementById("books-grid");
    booksGrid.innerHTML = '';   
    let filteredBooks = sampleBooks;
    if (category !== 'all') {
        filteredBooks = sampleBooks.filter(book => 
            book.category.toLowerCase() === category.toLowerCase()
        );
    }
    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-books-message">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>No books found in this category</h3>
                <p>Check back soon for new arrivals!</p>
            </div>
        `;
    } else {
        filteredBooks.forEach(book => {
            const bookCard = createBookCard(book);
            booksGrid.appendChild(bookCard);
        });
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .no-books-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: var(--secondary-color);
    }
    .no-books-message i {
        margin-bottom: 20px;
        color: var(--primary-color);
    }
    .no-books-message h3 {
        margin-bottom: 10px;
        color: var(--text-color);
    }
`;
document.head.appendChild(style);

