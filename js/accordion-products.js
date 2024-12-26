// ----------------------------------------------------
//                 ACORDEÓN PRODUCTOS
// ----------------------------------------------------

// creamos variables y constantes
const mainImage = document.querySelector('.Product-img img'); // Seleccionamos la etiqueta <img> dentro de .Product-img
const galleryImages = document.querySelectorAll('.Product-img-gallery img');

// añadimos un evento de click a cada imagen de la galería
galleryImages.forEach(function(image) {
    image.addEventListener('click', function() {
        // cambiamos la imagen principal
        mainImage.src = image.src;
    });
});
