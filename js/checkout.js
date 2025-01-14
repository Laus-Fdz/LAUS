// ----------------------------------------------------
//                 PASARELA DE PAGO
// ----------------------------------------------------

// -----------------------------------------------------------
// 1. Crear variables y constantes 
// -----------------------------------------------------------
const checkoutItemsContainer = document.querySelector(".Checkout-items");
const checkoutTotalPrice = document.querySelector(".Checkout-total-price");
const addressForm = document.getElementById("addressForm");
const paymentForm = document.getElementById("paymentForm");

// -----------------------------------------------------------
// 2. Función para cargar los productos del carrito
// -----------------------------------------------------------
function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // obtener los productos del carrito del localStorage
    checkoutItemsContainer.innerHTML = ""; // limpiar el contenedor de productos
    let total = 0;

    if (cart.length === 0) { // si el carrito está vacío...
        checkoutItemsContainer.innerHTML = "<p>El carrito está vacío</p>";
        checkoutTotalPrice.textContent = "0€";
        return;
    }

    // Mostrar los productos del carrito
    cart.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("Checkout-item");
        item.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>${product.quantity} x ${product.price}€</p>
            </div>
        `;
        checkoutItemsContainer.appendChild(item);
        total += product.price * product.quantity; // calcular total
    });

    checkoutTotalPrice.textContent = `${total.toFixed(2)}€`; // mostrar el total
}

// -----------------------------------------------------------
// 3. Guardar la dirección del formulario - Ayuda de chatgpt
// -----------------------------------------------------------
addressForm.addEventListener("submit", (event) => {
    event.preventDefault(); // para evitar que se recargue la página

    // Capturar valores de los campos del formulario
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const cp = document.getElementById("zip").value.trim();

    // Validar campos
    if (!name || !address || !city || !state || !cp) {
        alert("Por favor, completa todos los campos de dirección");
        return;
    }

    alert("Dirección guardada con éxito");
});

// -----------------------------------------------------------
// 4. Procesar el pago al enviar el formulario
// -----------------------------------------------------------
paymentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que se recargue la página

    // Capturar valores de los campos del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Validar campos
    if (!name || !email || !cardNumber || !expiryDate || !cvv) {
        alert("Por favor, completa todos los campos de pago");
        return;
    }

    alert("Pago realizado con éxito");
    localStorage.removeItem("cart"); // Vaciar el carrito
    window.location.href = "./confirmacion-compra.html"; // Ir a la página de confirmación de compra
});

// -----------------------------------------------------------
// 5. Cargar los productos del carrito al abrir la página
// -----------------------------------------------------------
document.addEventListener("DOMContentLoaded", loadCheckout);
