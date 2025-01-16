// ----------------------------------------------------
//         AGREGAR PRODUCTOS AL CARRITO !!
// ----------------------------------------------------

// -----------------------------------------------------------
// 1. Creamos constantes y variables
// -----------------------------------------------------------
const cartItemsContainer = document.querySelector(".Cart-items"); // contenedor de los productos en el carrito
const cartTotalPrice = document.querySelector(".Cart-total-price"); // precio total del carrito
const checkoutButton = document.getElementById("proceedToCheckout");// Busca en el html el id "proceedToCheckout"

// -----------------------------------------------------------
// 2. EventListener y Funciones
// -----------------------------------------------------------

// EventListener para botón "Añadir al carrito"
document.addEventListener("DOMContentLoaded", () => { // DOMContentLoaded: evento que se dispara cuando el documento HTML ha sido completamente cargado y parseado, PARA EVITAR QUE SE EJECUTE EL CÓDIGO ANTES DE QUE SE CARGUE EL DOM.
    const addToCartButton = document.querySelector(".Product-button"); // Botón "Añadir al carrito"
    if (addToCartButton) { // Si el botón existe    
        addToCartButton.addEventListener("click", () => { // Evento click
            const product = getProductDetails(); // Obtener detalles del producto
            addToCart(product); // Agregar producto al carrito
        });
    }
});


// Obtener detalles del producto actual
function getProductDetails() { // Obtener detalles del producto
    const productID = parseInt(new URLSearchParams(window.location.search).get("id")); // Obtener ID del producto   
    const productName = document.querySelector(".Product-title").textContent; // Obtener nombre del producto
    const productPrice = parseFloat(document.querySelector(".Product-price").textContent.replace("€", "")); // Obtener precio del producto
    const productImage = document.querySelector(".Product-img img").src; // Obtener imagen del producto

    const isCustom = document.querySelector(".Product-custom-flag") !== null; // esta constante verifca si hay un producto personalizado en el DOM

    return { // Devolver objeto con los detalles del producto
        id: productID,
        name: productName,
        price: productPrice,
        image: productImage,
        isCustom: true, // para productos personalizados
        quantity: 1, // Cantidad inicial
    };
}


// Agregar producto al carrito
function addToCart(product) {
    if (product.isCustom) {  // si el producto es personalizado isCustom
        return; // sal de la función (para que redirija a la página de contacto (esto lo he hecho en productos-page.js))
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener productos del carrito o crear un array vacío
    const existingProduct = cart.find(item => item.id === product.id); // Buscar si el producto ya está en el carrito

    if (existingProduct) { // Si el producto ya está en el carrito
        existingProduct.quantity += 1; // Aumentar la cantidad
    } else {
        cart.push(product); // Agregar el producto al carrito
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito en localStorage
    alert(`${product.name} ha sido añadido al carrito`); // Mostrar mensaje de confirmación
    console.log("Carrito actualizado:", cart); // Mostrar el carrito en la consola
}


// Cargar los productos del carrito
function loadCart() {

    if(!cartItemsContainer || !cartTotalPrice) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener productos del carrito
    cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
    let total = 0;

    if (cart.length === 0) { // Si el carrito está vacío
        cartItemsContainer.innerHTML = `
        <p class="Cart-alert">El carrito está vacío</p>`; // Mostrar mensaje de carrito vacío

        cartTotalPrice.textContent = "0€"; // Mostrar precio total 0
        return;
    }

    cart.forEach(product => { // Recorrer los productos del carrito
        const item = document.createElement("div"); // Crear un div para cada producto
        item.classList.add("Cart-item"); // Agregar clase "Cart-item"
        item.innerHTML = ` 
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>${product.price}€</p>
                <br>
                <button class="Cart-remove fas fa-trash" data-id="${product.id}"></button>
            </div>
        `; // Agregar imagen, nombre, precio y botón de eliminar

        cartItemsContainer.appendChild(item); // Agregar el producto al contenedor
        total += product.price; // Calcular el precio total
    });

    cartTotalPrice.textContent = `${total.toFixed(2)}€`; // Mostrar el precio total

    // Agregar evento de aumentar y disminuir cantidad de productos
    document.querySelectorAll(".Cart-item-quantity").forEach(button => {
        button.addEventListener("click", (event) => {
            const productID = parseInt(event.target.getAttribute("data-id"));
            const action = event.target.classList.contains("fa-plus") ? "increase" : "decrease";
            updateQuantity(productID, action);
        });
    });


    // Agregar evento de eliminar producto
    document.querySelectorAll(".Cart-remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const productID = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productID);
        });
    });
}



// Actualizar cantidad de productos
function updateQuantity(productID, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener productos del carrito
    const product = cart.find(item => item.id === productID); // Buscar el producto
    const productIndex = cart.findIndex(item => item.id === productID); // Buscar el índice del producto

    if (action === "increase") { // Si se aumenta la cantidad
        product.quantity += 1; // Aumentar la cantidad
    } else if (action === "decrease") { // Si se disminuye la cantidad
        if (product.quantity > 1) { // Si la cantidad es mayor a 1
            product.quantity -= 1; // Disminuir la cantidad
        } else {
            cart = cart.filter(item => item.id !== productID); // Filtrar el producto a eliminar
        }
    }

    cart[productIndex] = product; // Actualizar el producto en el carrito
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito en localStorage
    loadCart(); // Recargar el carrito
}



// Eliminar producto del carrito
function removeFromCart(productID) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener productos del carrito
    cart = cart.filter(product => product.id !== productID); // Filtrar el producto a eliminar
    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito en localStorage
    alert("¿Seguro que quieres eliminar este producto del carrito?");
    loadCart(); // Recargar el carrito
}


// Agregar evento al botón de comprar
// Verifica si el botón existe
if (checkoutButton) { 
    // Añade un evento de click
    checkoutButton.addEventListener("click", () => {
        // Obtiene el carrito del localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // varifica si el carrito está vacío
        if (cart.length === 0) {
            alert("El carrito está vacío")
        } else {
            // si no está vacío redirecciona a la página de pago
            window.location.href = "./pasarela-pago.html";
        }
    });
}

// -----------------------------------------------------------
// 3. Iniciamos el código
// -----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // Cargar el carrito al iniciar la página
});