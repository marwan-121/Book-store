// main.js

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for fixed header height
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    navToggle.classList.remove("active");
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset for header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Handle search form submission
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById("search-term").value;
            const category = document.getElementById("category").value;
            const priceRange = document.getElementById("price-range").value;
            const sortBy = document.getElementById("sort-by").value;
            
            alert(`Searching for books...\nTerm: ${searchTerm}\nCategory: ${category}\nPrice Range: ${priceRange}\nSort By: ${sortBy}`);
            
            // In a real application, you would send this data to a backend server
            // and update the books grid with search results
        });
    }

    // Cart functionality
    const cartBtn = document.getElementById("cart-btn");
    const cartCount = document.querySelector(".cart-count");
    let cartItems = 0;

    if (cartBtn && cartCount) {
        cartBtn.addEventListener("click", () => {
            alert("Cart functionality will be implemented in the future!");
        });
    }

    // Update cart count (this would come from backend in real app)
    function updateCartCount(count) {
        cartItems = count;
        cartCount.textContent = cartItems;
    }

    // Initialize cart
    updateCartCount(0);
});

// Book data (would come from backend in real application)
const sampleBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        rating: 4.5,
        category: "fiction"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 14.95,
        rating: 4.8,
        category: "fiction"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 10.99,
        rating: 4.7,
        category: "fiction"
    },
    {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 16.50,
        rating: 4.6,
        category: "fantasy"
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 9.99,
        rating: 4.4,
        category: "romance"
    },
    {
        id: 6,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        price: 13.25,
        rating: 4.2,
        category: "mystery"
    }
];
