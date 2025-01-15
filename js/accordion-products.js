// ----------------------------------------------------
//                 ACORDEÓN PRODUCTOS
// ----------------------------------------------------

// ----------------------------------------------------
//  1. Creamos constantes y variables
// ----------------------------------------------------

const mainImage = document.querySelector('.Product-img img'); // Seleccionamos la etiqueta <img> dentro de .Product-img
const galleryImages = document.querySelectorAll('.Product-img-gallery img');

// ----------------------------------------------------
//  2. Eventlistener y funciones
// ----------------------------------------------------
// añadimos un evento de click a cada imagen de la galería
galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
        // cambiamos la imagen principal
        mainImage.src = image.src;
    });
});
