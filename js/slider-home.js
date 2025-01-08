// ----------------------------------------------------
//                  CARRUSEL IMÁGENES HOME
// ----------------------------------------------------

// -----------------------------------------------------------
// 1. Creamos constantes y variables
// -----------------------------------------------------------
const sliderImages = document.querySelector('.Gallery-slider');
const images = document.querySelectorAll('.Gallery-image');
const btnNext = document.querySelector('#btnSig');
const btnPrev = document.querySelector('#btnPrev');


let currentImageIndex = 0; // Índice de la imagen inicial (comienza desde 0)
const totalImages = images.length; // Número total de imágenes

// -----------------------------------------------------------
// 2. EventListener y Funciones
// -----------------------------------------------------------
btnNext.addEventListener('click', nextImage);
btnPrev.addEventListener('click', prevImage);

// Avanza a la siguiente imagen
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length-1) {
        currentImageIndex = 0; // Vuelve a la primera imagen si es el final
    }
    actualizarSlider();
    actualizarContador();
}

// Retrocede a la imagen anterior
function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Vuelve a la última imagen si es el principio
    }
    actualizarSlider();
    actualizarContador();
}

// Actualiza el desplazamiento del slider
function actualizarSlider() {
    const width = window.innerWidth; // Ancho dinámico del viewport del navegador
    sliderImages.style.transform = `translateX(${-width * currentImageIndex}px)`; // Mueve el slider
}


// -----------------------------------------------------------
// 3. Ejecutamos nuestro código
// -----------------------------------------------------------


// -----------------------------------------------------------
// 4. Funcionalidad de intervalo automático
// -----------------------------------------------------------

// Intervalo para avanzar automáticamente cada 3 segundos
let intervalos;
function agregarIntervalo() {
    intervalos = setInterval(nextImage, 3000);
}

// Pausar el intervalo al pasar el ratón por encima del slider
sliderImages.addEventListener('mouseover', () => {
    clearInterval(intervalos); // Detiene el intervalo
});

// Reanudar el intervalo al salir el ratón del slider
sliderImages.addEventListener('mouseout', () => {
    agregarIntervalo(); // Reanuda el intervalo
});
agregarIntervalo();

