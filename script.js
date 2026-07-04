const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Smart Watch", price: 3000 },
    { id: 5, name: "Keyboard", price: 1000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const total = document.getElementById("total");

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
            </div>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);

    cart.push(product);

    saveCart();

    displayCart();
}

function displayCart() {

    cartList.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {

        totalPrice += item.price;

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price}

            <button class="remove-btn"
            onclick="removeItem(${index})">
            Remove
            </button>
        `;

        cartList.appendChild(li);

    });

    total.textContent = totalPrice;
}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

document.getElementById("checkoutBtn").onclick = function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("Order placed successfully!");

    cart = [];

    saveCart();

    displayCart();

};

displayProducts();

displayCart();
