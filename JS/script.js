function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 134900,
    category: "electronics",
    img: "images/i-phone.jpeg",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 114900,
    category: "electronics",
    img: "images/laptop.jpeg",
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    price: 41900,
    category: "fashion",
    img: "images/watch.jpeg",
  },
  {
    id: 4,
    name: "Nike Air Max",
    price: 7995,
    category: "fashion",
    img: "images/shoes.jpeg",
  },
  {
    id: 5,
    name: "Lamp",
    price: 1499,
    category: "home",
    img: "images/home1.jpeg",
  },
  {
    id: 6,
    name: "Truck",
    price: 899,
    category: "toy",
    img: "images/toy1.jpeg",
  },
  {
    id: 7,
    name: "Chair",
    price: 3000,
    category: "home",
    img: "images/home2.jpg",
  },
  {
    id: 8,
    name: "Glasses",
    price: 4500,
    category: "accessories",
    img: "images/accessories-1.jpeg",
  },
  {
    id: 9,
    name: "Toy Robot",
    price: 1499,
    category: "toy",
    img: "images/toy2.jpeg",
  },
  {
    id: 10,
    name: "Pendents",
    price: 5000,
    category: "accessories",
    img: "images/accessories-2.jpeg",
  },
  {
    id: 11,
    name: "Fluffy Bear",
    price: 999,
    category: "toy",
    img: "images/toy3.jpeg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";

/* DISPLAY */
function displayProducts(list = products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach((p, index) => {
    container.innerHTML += `
    <div class="col-md-3 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card">
          <img src="${p.img}" class="img-fluid">
          <h6>${p.name}</h6>
          <p>₹${p.price.toLocaleString("en-IN")}</p>
          <button class="btn btn-success" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    `;
  });
}

/* SEARCH */
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(value) &&
      (currentCategory === "all" || p.category === currentCategory),
  );

  displayProducts(filtered);
});

/* CATEGORY */
function filterCategory(cat) {
  currentCategory = cat;

  const filtered =
    cat === "all" ? products : products.filter((p) => p.category === cat);

  displayProducts(filtered);
}

/* CART */
function addToCart(id) {
  const item = cart.find((p) => p.id === id);

  if (item) item.qty++;
  else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find((p) => p.id === id);
  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const totalEl = document.getElementById("total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item d-flex align-items-center mb-3">
        
        <!-- Image -->
        <img src="${item.img}" class="cart-img">

        <!-- Details -->
        <div class="ms-3 flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <small>₹${item.price.toLocaleString("en-IN")}</small>

          <div class="mt-1">
            <button onclick="changeQty(${item.id}, -1)" class="qty-btn">-</button>
            <span class="mx-2">${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)" class="qty-btn">+</button>
          </div>
        </div>

        <!-- Remove -->
        <button onclick="removeItem(${item.id})" class="remove-btn">✖</button>

      </div>
    `;
  });

  count.innerText = cart.length;
  totalEl.innerText = total.toLocaleString("en-IN");

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(id) {
  cart = cart.filter((p) => p.id !== id);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

/* DARK MODE */
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

/* INIT */
displayProducts();
updateCart();
