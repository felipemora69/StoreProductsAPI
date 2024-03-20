document.addEventListener("DOMContentLoaded", async function () {
    const productsContainer = document.getElementById("products");
    const sortSelect = document.getElementById("sort");
    const categorySelect = document.getElementById("category");

    // Fetch data from API
    async function fetchData() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            console.log("Fetched data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Render products
    async function renderProducts() {
        const data = await fetchData();
        productsContainer.innerHTML = ""; // Clear previous products

        console.log("Category selected:", categorySelect.value);

        let filteredData = data;
        if (categorySelect.value !== "all") {
            filteredData = data.filter(product => product.category === categorySelect.value);
        }

        console.log("Filtered data:", filteredData);

        const sortedData = filteredData.sort((a, b) => {
            if (sortSelect.value === "price_asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        console.log("Sort by:", sortSelect.value);
        console.log("Filter by category:", categorySelect.value);

        console.log("Sorted data:", sortedData);

        sortedData.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" />
                <h2 class="title">${product.title}</h2>
                <div class="description-container">
                    <button class="more-btn">See More</button>
                    <p class="description hidden">${product.description}</p>
                </div>
                <p class="category">Category: ${product.category}</p>
                <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
                <p class="price">Price: $${product.price}</p>
            `;
            productsContainer.appendChild(productCard);

            // Add event listener to see more button
            const moreBtn = productCard.querySelector('.more-btn');
            const description = productCard.querySelector('.description');
            moreBtn.addEventListener('click', () => {
                console.log("See More button clicked");
                description.classList.toggle('hidden');
                productCard.classList.toggle('expanded');
                moreBtn.innerText = description.classList.contains('hidden') ? 'See More' : 'See Less';
            });
        });
    }

    sortSelect.addEventListener("change", function() {
        console.log("Sort by:", sortSelect.value);
        renderProducts();
    });

    categorySelect.addEventListener("change", function() {
        console.log("Category selected:", categorySelect.value);
        console.log("Filter by category:", categorySelect.value);
        renderProducts();
    });

    // Render products on page load
    renderProducts();
});