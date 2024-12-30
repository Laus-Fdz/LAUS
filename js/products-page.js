// ----------------------------------------------------
//                 CARGA DINÁMICA DE PRODUCTOS
// ----------------------------------------------------

// Cargar archivos JSON
const productsJSON = './data/products.json';

// Obtener los parámetros de la URL para identificar el producto
const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');

// Elementos del DOM
const productTitle = document.querySelector(".Product-title");
const productDescription = document.querySelector(".Product-description");
const productPrice = document.querySelector(".Product-price");
const productImg = document.querySelector(".Product-img img");
const relatedItemsContainer = document.querySelector(".Related-items");

// Función para cargar los productos
async function loadProductsData() {
    try {
        // Obtenemos los datos del JSON
        const response = await fetch(productsJSON);
        const products = await response.json();

        // Econtrar el producto actual
        const currentProduct = products.find(product => product.id === parseInt(productID));
        if (!currentProduct) {
            throw new Error('Producto no encontrado');
        }

        // Actualizar el contenido del producto
        productTitle.textContent = currentProduct.name;
        productDescription.textContent = `${currentProduct.name}, ${currentProduct.description}`;
        productPrice.textContent = `$${currentProduct.price}`;
        productImg.src = currentProduct.image;
        productImg.alt = currentProduct.name;

        // Cargar productos
        loadRelatedProducts(products, currentProduct.id);

    }   catch (error) {
        console.error("Error al cargar los productos:",error);
        productTitle.textContent = "Producto no encontrado";
        productDescription.textContent = "El producto que buscas no existe";
        productPrice.textContent = "-";
    }
}

// Función para cargar productos relacionados

function loadRelatedProducts(products, currentProductID) {
    // Filtrar productos relacionados
    const relatedProducts = products.filter(product => product.id !== currentProductID).slice(0, 3); // mostrar solo 3 productos relacionados

    // Mostrar productos relacionados (cargarlos del HTML)
    relatedProducts.forEach(product => {
        const item = document.createElement("a");
        relatedItem.href = `./prints.html?id=${product.id}`;
        relatedItem.classList.add("Related-item");

        relatedItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
        `;

        relatedItemsContainer.appendChild(relatedItem);
    });
}

// Iniciamos nuestro código
loadProductsData();