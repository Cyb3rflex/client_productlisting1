document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");
  const searchBar = document.getElementById("search-bar");
  const filterCategory = document.getElementById("filter-category");
  const paginationInfo = document.getElementById("page-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");

  let products = [];
  let currentPage = 1;
  const itemsPerPage = 5;

  // Fetch products from API
  async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products"); // Example API
    return await response.json();
  }

  products = await fetchProducts();

  // Function to display products
  function displayProducts(productArray) {
    productList.innerHTML = "";
    productArray.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
        `;
      productList.appendChild(productCard);
    });

    // Animate products with GSAP
    gsap.from(".product-card", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
    });
  }

  // Function to paginate products
  function paginate(productsArray, page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return productsArray.slice(start, end);
  }

  // Update pagination display
  function updatePagination() {
    paginationInfo.textContent = `Page ${currentPage}`;
    const paginatedProducts = paginate(products, currentPage);
    displayProducts(paginatedProducts);
  }

  // Search functionality
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    currentPage = 1; // Reset to first page
    updatePagination(filteredProducts);
  });

  // Filter functionality
  filterCategory.addEventListener("change", (e) => {
    const category = e.target.value;
    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;
    currentPage = 1; // Reset to first page
    updatePagination(filteredProducts);
  });

  // Handle Previous and Next buttons
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage * itemsPerPage < products.length) {
      currentPage++;
      updatePagination();
    }
  });

  // Initial load
  updatePagination();
});
