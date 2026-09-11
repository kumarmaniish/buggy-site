// Dummy "dynamic" order data for the second-level Dashboard page - no backend
const ORDERS = [
  { id: 101, item: "Wireless Mouse", qty: 1, status: "Delivered" },
  { id: 102, item: "Bluetooth Speaker", qty: 2, status: "In Transit" },
  { id: 103, item: "Desk Lamp", qty: 1, status: "Processing" }
];

function renderOrders(list) {
  const container = document.getElementById("orderList");
  container.innerHTML = "";
  list.forEach(function (o) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML =
      "<h4>" + o.item + "</h4>" +
      "<p>Qty: " + o.qty + "</p>" +
      "<p>Status: " + o.status + "</p>";
    container.appendChild(card);
  });
}

renderOrders(ORDERS);

// DRP-04: filter dropdown change handler exists but does not actually filter anything
document.getElementById("filterCategory").addEventListener("change", function () {
  // BUG: intentionally not filtering ORDERS by category
  console.log("Filter changed to " + this.value + " (not implemented)");
});

// L2-05: Checkout button intentionally has NO event listener attached at all
