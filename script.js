document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const sortSelect = document.getElementById("sort");
    const categorySelect = document.getElementById("category");

    // Fetch data from API
    async function fetchData() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Render products
    async function renderProducts() {
        const data = await fetchData();
        productsContainer.innerHTML = ""; // Clear previous products

        let filteredData = data;
        if (categorySelect.value !== "all") {
            filteredData = data.filter(product => product.category === categorySelect.value);
        }

        const sortedData = filteredData.sort((a, b) => {
            if (sortSelect.value === "price_asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        sortedData.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <h2>${product.title}</h2>
                <p>Category: ${product.category}</p>
                <p>Price: $${product.price}</p>
                <p>Description: ${product.description}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    sortSelect.addEventListener("change", renderProducts);
    categorySelect.addEventListener("change", renderProducts);

    renderProducts(); // Initial render
});