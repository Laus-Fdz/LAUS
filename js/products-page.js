// ----------------------------------------------------
//                 CARGA DINÁMICA DE PRODUCTOS
// ----------------------------------------------------

// Cargar archivos JSON (archivo que contiene la información de los productos)
const productsJSON = './data/products.json';

// Obtener los parámetros de la URL para identificar el producto por id
const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');

// Selencionar elementos del DOM donde se mostrará la información de los productos y los productos relacionados
const productTitle = document.querySelector(".Product-title");
const productDescription = document.querySelector(".Product-description");
const productPrice = document.querySelector(".Product-price");
const productImg = document.querySelector(".Product-img img");
const relatedItemsContainer = document.querySelector(".Related-items");

// Función para cargar los productos de JSON de forma asíncrona
async function loadProductsData() {
    try {
        // Obtenemos los datos del JSON usando fetch y se convierte en un objeto de javascript
        const response = await fetch(productsJSON);
        const products = await response.json();

        // Econtrar el producto actual que conincida con el id de la URL
        const currentProduct = products.find(product => product.id === parseInt(productID));
        if (!currentProduct) {
            throw new Error('Producto no encontrado'); // si no se encuentra el producto, lanzar un error
        }

        // Actualizar el contenido del producto en el HTML
        productTitle.textContent = currentProduct.name;
        productDescription.textContent = `${currentProduct.name}, ${currentProduct.description}`;
        productPrice.textContent = `${currentProduct.price}€`;
        productImg.src = currentProduct.image;
        productImg.alt = currentProduct.name;

        // Se llama a otra función para cargar productos relacionados
        loadRelatedProducts(products, currentProduct.id);

        // Si ocurreo un error, se muestra un mensaje de error en la consola
    }   catch (error) {
        console.error("Error al cargar los productos:",error);
        productTitle.textContent = "Producto no encontrado";
        productDescription.textContent = "El producto que buscas no existe";
        productPrice.textContent = "-";
    }
}

// Función para cargar productos relacionados excluyendo el producto actual

function loadRelatedProducts(products, currentProductID) {
    // Filtrar productos relacionados
    const relatedProducts = products.filter(product => product.id !== currentProductID).slice(0, 3); // mostrar solo 3 productos relacionados

    // Mostrar productos relacionados (cargarlos del HTML)
    relatedProducts.forEach(product => {
        const item = document.createElement("a"); // se crea un enlace para cada producto relacionado
        item.href = `./prints.html?id=${product.id}`; // se establece su enlace
        item.classList.add("Related-item"); 

        // se añade la información del producto relacionado
        item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>€${product.price}</p>
        `;

        // se inserta el enlace dentro del contenedor de productos relacionados
        relatedItemsContainer.appendChild(item);
    });
}

// Iniciamos nuestra carga dinámica al abrir la página
loadProductsData();