// ----------------------------------------------------
//                 CARGA DINÁMICA DE PRODUCTOS
// ----------------------------------------------------

// ----------------------------------------------------
//  1. Creamos constantes y variables
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

// para seleccionar tamaños
const sizeSelect = document.querySelector(".Product-size-select");


// ----------------------------------------------------
//  2. Funciones y EventListeners
// ----------------------------------------------------


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
        productImg.src = currentProduct.image;
        productImg.alt = currentProduct.name;

        // Comprobar si es un producto personalizado (isCustom lo he añadido al producto personalizado que no quiero que siga la logica de todos los demás JSON)
        if (currentProduct.isCustom) {
            productDescription.textContent = currentProduct.description;
            productPrice.textContent = `${currentProduct.priceRange.min}€ - ${currentProduct.priceRange.max}€`;

            // Ocultar selector de tamaños
            const sizeContainer = document.querySelector(".Product-sizes");
            sizeContainer.style.display = "none";

            // Cambiar el botón
            const addToCartButton = document.querySelector(".Product-button");
            addToCartButton.textContent = "Contactar";

            // agregamos un evento de click que redirije al formulario de contacto
            addToCartButton.addEventListener("click", () => {
                window.location.href = "./contacto.html";
            });
        } else {

            // comportamiento normal para productos estándar
            productDescription.textContent = `${currentProduct.name},${currentProduct.description}`;
            productPrice.textContent = `${currentProduct.price[currentProduct.sizes[0]]}€`;

            // Configurar las opciones de tamaño
            sizeSelect.innerHTML = ""; // limpiar las opciones actuales
            currentProduct.sizes.forEach(size => {
                const option = document.createElement("option");
                option.value = size;
                option.textContent = size;
                sizeSelect.appendChild(option);
            });

            // Excluir productos personalizados al mostrar el stock
            if (!currentProduct.isCustom) {
                const stockInfo = document.querySelector(".Stock-number");
                stockInfo.textContent = `${currentProduct.stock[currentProduct.sizes[0]]}`; 
            }

        }

        // Actualizar el precio dinámicamente al cambiar el tamaño
        sizeSelect.addEventListener("change", () => {
            const selectedSize = sizeSelect.value;
            const newPrice = currentProduct.price[selectedSize];
            productPrice.textContent = `${newPrice}€`;
        });

        // Comprobación para evitar errores si selectedSize no tiene precio
        sizeSelect.addEventListener("change", () => {
            const selectedSize = sizeSelect.value;
            const newPrice = currentProduct.price[selectedSize];
            if (newPrice !== undefined) {
                productPrice.textContent = `${newPrice}€`;
            } else {
                productPrice.textContent = "No disponible";
            }
        });


        //Cargar imágenes de la galería
        const galleryContainer = document.querySelector('.Product-img-gallery');
        galleryContainer.innerHTML = ''; // limpiar la galería ya existente

        currentProduct.gallery.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = currentProduct.name;
            img.addEventListener("click", function () {
                productImg.src = imageSrc;
            });
            galleryContainer.appendChild(img);
        });

        // Se llama a otra función para cargar productos relacionados
        loadRelatedProducts(products, currentProduct.id);

        // Si ocurreo un error, se muestra un mensaje de error en la consola
    } catch (error) {
        console.error("Error al cargar los productos:", error);
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
        const firstSize = product.sizes[0]; // obtener el primer tamaño disponible del producto como determinado
        const price = product.price[firstSize]; // Obtener el precio para ese tamaño

        const item = document.createElement("a"); // se crea un enlace para cada producto relacionado
        item.href = `./productos.html?id=${product.id}`; // se establece su enlace
        item.classList.add("Related-item");

        // se añade la información del producto relacionado
        item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3 class="Related-subTitle">${product.name}</h3>
                <p class="Related-description">${price}€</p>
        `;

        // se inserta el enlace dentro del contenedor de productos relacionados
        relatedItemsContainer.appendChild(item);
    });
}

// ----------------------------------------------------
//  3. Iniciamos nuestro código
// ----------------------------------------------------

// Iniciamos nuestra carga dinámica al abrir la página
loadProductsData();