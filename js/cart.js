// ----------------------------------------------------
//            CARGAR PRODUCTOS AL CARRITO !!
// ----------------------------------------------------

// Creamos constantes para los elementos del DOM que se van a modificar
const cartItemsContainer = document.querySelector(".Cart-items");
const cartTotalPrice = document.querySelector(".Cart-total-price");
const addToCartButton = document.querySelector(".Product-button");

// Agregar enventlistener a botones de añadir al carrito
addToCartButton.addEventListener("click", () => {
    // obtener los datos del producto actual
    const productID = parseInt(new URLSearchParams(window.location.search).get("id"));
    const productName = document.querySelector(".Product-title").textContent;
    const productPrice = parseFloat(document.querySelector(".Product-price").textContent.replace("€", ""));
    const productImage = document.querySelector(".Product-img img").src;

    // crear un objeto con los datos del producto
    const product = {
        id: productID,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1 // cantidad inicial
    };

    // llamar a la función de agregar al carrito
    addToCart(product);
});

// Función para agregar productos al carrito
function addToCart(product) {
    // obtenemos el carrito actual desde localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // verificamos si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === product.id);

    // si el producto ya está en el carrito, aumentar la cantidad
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // si no está en el carrito, agregarlo
        cart.push(product);
    }

    // guardamos el carrito
    localStorage.setItem("cart", JSON.stringify(cart));

    // Podemos mostrar un mensaje de confirmación por ejemplo:
    alert(`${product.name} El producto ha sido añadido al carrito`);
}

// Función para cargar los productos del carrito
function loadCart() {
    // obtenemos el carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Si el carrito está vacío, mostrar un mensaje
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>El carrito está vacío</p>";
        cartTotalPrice.textContent = "0€";
        return;
    }

    // limpiar el contenedor
    cartItemsContainer.innerHTML = "";

    // variable para calcular el precio total
    let total = 0;

    // Recorrer los productos del carrito
    cart.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("Cart-item");

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>${product.price}€</p>
                <p>Cantidad: ${product.quantity}</p>
                <button class="Cart-remove" data-id="${product.id}">Eliminar</button>
            </div>
        `;

        // sumar el precio total
        total += product.price * product.quantity;

        // añadir el producto al contenedor
        cartItemsContainer.appendChild(item);
    });

    // actualizar el precio total
    cartTotalPrice.textContent = `${total}€`;

    // AGREGAR EL EVENTO DE ELIMINAR PRODUCTO
    cartItemsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("Cart-remove")) {
            const productID = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productID);
        }
    });
}

// Llamamos a loadCart() solo una vez cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // Cargar el carrito cuando la página se haya cargado
});
