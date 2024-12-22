// ----------------------------------------------------
//                  MENÚ MÓVIL 
// ----------------------------------------------------

// creamos la constante del botón del menu y del contenedor del menú
const menuButton = document.querySelector(".Nav-menu");
const navLinks = document.querySelector(".Nav-menuLinks");

// añadimos el eventListener de click al botón del menu
menuButton.addEventListener("click", function () {
    // alternamos la clase active en los enlaces de navegación
    navLinks.classList.toggle("active");
});


// ----------------------------------------------------
//                  CARRUSEL IMÁGENES
// ----------------------------------------------------

// Creamos constantes y variables para seleccionar los elementos del HTML
const sliderImages = document.querySelector('.Gallery-slider');
const images = document.querySelectorAll('.Gallery-image');
const btnNext = document.querySelector('#btnSig');
const btnPrev = document.querySelector('#btnPrev');

let currentImageIndex = 0;
const totalImages = images.length;
let intervalo; // Declaración del intervalo para el auto-slide

// EventListeners y Funciones
btnNext.addEventListener('click', nextImage); // Acción de avanzar al siguiente
btnPrev.addEventListener('click', prevImage); // Acción de retroceder

// Función para avanzar a la siguiente imagen
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0; // Reinicia al inicio
    }
    actualizarSlider();
}

// Función para retroceder a la imagen anterior
function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1; // Regresa al final
    }
    actualizarSlider();
}

// Función para actualizar el desplazamiento del slider
function actualizarSlider() {
    const width = images[0].clientWidth; // Obtiene dinámicamente el ancho de la imagen
    sliderImages.style.transform = `translateX(${-width * currentImageIndex}px)`; // Mueve el slider
}

// Función para cargar imágenes 
function cargarImagenes() {
    actualizarSlider(); // Asegura que el slider esté correctamente alineado al inicio
}

// Función de inicio automático del carrusel
function iniciarCarrusel() {
    intervalo = setInterval(nextImage, 3000); // Cambia la imagen cada 3 segundos
}

// Detiene el carrusel cuando el mouse está encima
sliderImages.addEventListener('mouseover', () => {
    clearInterval(intervalo);
});

// Reinicia el carrusel cuando el mouse se va
sliderImages.addEventListener('mouseout', iniciarCarrusel);

// Inicialización del carrusel
cargarImagenes();
iniciarCarrusel();

