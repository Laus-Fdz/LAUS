// ----------------------------------------------------
//                 CARGA DINÁMICA DE PRODUCTOS
// ----------------------------------------------------

// Creamos constantes para los elementos del DOM que se van a modificar
const cartItemsContainer = document.querySelector(".Cart-items");
const cartTotalPrice = document.querySelector(".Cart-total-price");

// Función para cargar los productos del carrito ( ayuda de chatgpt para saber cual era la función loadCart())
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
    cart.array.forEach(product => {
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
    
}