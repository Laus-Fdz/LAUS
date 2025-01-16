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
document.addEventListener("DOMContentLoaded", () => { // DOMContentLoaded: evento que se usa PARA EVITAR QUE SE EJECUTE EL CÓDIGO ANTES DE QUE SE CARGUE EL DOM.
    const addToCartButton = document.querySelector(".Product-button"); // Botón "Añadir al carrito"
    if (addToCartButton) { // Si el botón existe    
        addToCartButton.addEventListener("click", () => { // Evento click
            const product = getProductDetails(); // Obtener detalles del producto

            // si es un producto es personalizado PREVIENE (preventDefaul) la acción y redirige a la página de contacto!
            if (product.isCustom) {
                e.preventDefault();
                window.location.href = "./contacto.html";
                return; 
            }

            addToCart(product); // Agregar producto al carrito
        });
    }
});


// FUNCIÓN PARA OBTENER LOS DETALLES DEL PRODUCTO
function getProductDetails() { // Obtener detalles del producto
    const productID = parseInt(new URLSearchParams(window.location.search).get("id")); // Obtener ID del producto   
    const productName = document.querySelector(".Product-title").textContent; // Obtener nombre del producto
    const productPrice = parseFloat(document.querySelector(".Product-price").textContent.replace("€", "")); // Obtener precio del producto
    const productImage = document.querySelector(".Product-img img").src; // Obtener imagen del producto

    const isCustom = document.querySelector(".Product-button").textContent === "Contactar"; // esta constante verifca si hay un producto personalizado en el DOM
    
    return { // Devolver objeto con los detalles del producto
        id: productID,
        name: productName,
        price: productPrice,
        image: productImage,
        isCustom: isCustom, // para productos personalizados
    };
}


// FUNCIÓN DE AGREGAR PRODUCTOS AL CARRITO
function addToCart(product) {

    if (product.isCustom) {  // si el producto es personalizado isCustom
        return; // sal de la función (para que redirija a la página de contacto)
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


// FUNCIÓN CARGAR LOS PRODUCTOS DEL CARRITO
function loadCart() {

    if (!cartItemsContainer || !cartTotalPrice) return; // verifica que ambos elementos existan

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


    // Agregar evento de eliminar producto
    document.querySelectorAll(".Cart-remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const productID = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productID);
        });
    });
}



// FUNCIÓN PARA ELIMINAR PRODUCTOS DEL CARRITO
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