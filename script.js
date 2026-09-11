// ------------------------------------------------------------------
// Dummy "dynamic" data - no backend, everything lives in this array
// ------------------------------------------------------------------
const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 19.99, category: "electronics" },
  { id: 2, name: "Laptop Stand", price: 34.50, category: "electronics" },
  { id: 3, name: "Cotton T-Shirt", price: 14.00, category: "clothing" },
  { id: 4, name: "Ceramic Mug", price: 9.99, category: "home" },
  { id: 5, name: "Bluetooth Speaker", price: 45.00, category: "electronics" },
  { id: 6, name: "Running Shoes", price: 59.99, category: "clothing" },
  { id: 7, name: "Desk Lamp", price: 22.30, category: "home" },
  { id: 8, name: "Laptop", price: 899.00, category: "electronics" }
];

let cartCount = 0;
let currentPage = 1;

function renderProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(function (p) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML =
      // NF-03 / STA-03: broken image path + no alt attribute, repeated per product
      '<img src="images/product-' + p.id + '-missing.jpg">' +
      "<h4>" + p.name + "</h4>" +
      "<p>$" + p.price.toFixed(2) + "</p>" +
      '<button type="button" class="add-to-cart-btn" data-id="' + p.id + '">Add to Cart</button>';
    container.appendChild(card);
  });
}

renderProducts(PRODUCTS);

// FUNC-01: Add to Cart button exists and is clickable, but cartCount / display never update
document.getElementById("productList").addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    // BUG: cartCount is incremented in memory...
    cartCount = cartCount + 1;
    // ...but document.getElementById("cartCount").textContent is never updated, so the
    // header counter visibly stays at 0. (Intentional FUNC-01 bug - do not "fix" by
    // uncommenting the line below.)
    // document.getElementById("cartCount").textContent = cartCount;
  }
});

// FUNC-02: search always reports "no results" even for existing products
document.getElementById("searchBtn").addEventListener("click", function () {
  const query = document.getElementById("searchBox").value;
  // BUG: comparing against the wrong field on purpose (undefined p.title instead of p.name)
  const matches = PRODUCTS.filter(function (p) {
    return p.title && p.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
  const status = document.getElementById("formStatus");
  if (matches.length === 0) {
    status.textContent = "No results found for \"" + query + "\".";
  } else {
    renderProducts(matches);
  }
});

// FUNC-03: sort dropdown fires but handler never re-renders in sorted order
document.getElementById("sortSelect").addEventListener("change", function () {
  // BUG: intentionally not sorting PRODUCTS or re-rendering
  console.log("Sort changed to " + this.value + " (not implemented)");
});

// FUNC-04: pagination buttons update the label but always render the same data
document.getElementById("nextPageBtn").addEventListener("click", function () {
  currentPage = currentPage + 1;
  document.getElementById("pageIndicator").textContent = "Page " + currentPage;
  // BUG: should slice PRODUCTS for the new page, but re-renders the full/first list every time
  renderProducts(PRODUCTS);
});

document.getElementById("prevPageBtn").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage = currentPage - 1;
  }
  document.getElementById("pageIndicator").textContent = "Page " + currentPage;
  renderProducts(PRODUCTS);
});

// DRP-03: changing Country never updates the State dropdown options
document.getElementById("country").addEventListener("change", function () {
  // BUG: intentionally does nothing - State list stays US states regardless of Country
  console.log("Country changed to " + this.value + " (State list not updated)");
});

// BTN-02: Save Draft button has a handler wired up... that intentionally does nothing
document.getElementById("saveDraftBtn").addEventListener("click", function () {
  // BUG: no save logic, no user feedback
});

// BTN-01: Submit has no disable-after-click guard, so rapid clicks create duplicate "accounts"
let signupCount = 0;
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  signupCount = signupCount + 1;
  document.getElementById("formStatus").textContent =
    "Account created (" + signupCount + " total submissions this session).";
  // BUG: submitBtn is never disabled, so users can click Submit repeatedly and create
  // multiple duplicate entries before any validation or debounce kicks in.
});

// BTN-03: Cancel is type="submit" in the HTML, so clicking it submits the form
// instead of resetting it. No separate handler is attached here on purpose.

// NF-01: artificial loading delay before hiding the overlay
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loadingOverlay").style.display = "none";
  }, 3000);
});
