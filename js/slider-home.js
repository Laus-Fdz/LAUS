// ----------------------------------------------------
//                  CARRUSEL IMÁGENES HOME
// ----------------------------------------------------

// Creamos constantes y variables para seleccionar los elementos del HTML
const sliderImages = document.querySelector('.Gallery-slider');
const images = document.querySelectorAll('.Gallery-image');
const btnNext = document.querySelector('#btnSig');
const btnPrev = document.querySelector('#btnPrev');

let currentImageIndex = 0;

// EventListeners y Funciones
btnNext.addEventListener('click', nextImage); // Acción de avanzar al siguiente
btnPrev.addEventListener('click', prevImage); // Acción de retroceder

// Función para avanzar a la siguiente imagen
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Reinicia al inicio
    }
    actualizarSlider();
}

// Función para retroceder a la imagen anterior
function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Regresa al final
    }
    actualizarSlider();
}

// Función para actualizar el desplazamiento del slider
function actualizarSlider() {
    const imageWidth = images[0].clientWidth; // Ancho de una imagen (ayuda de chatgpt)
    sliderImages.style.transform = `translateX(${-imageWidth * currentImageIndex}px)`; // Mover el slider
}



// Funcionalidad de intervalo

window.addEventListener('resize', actualizarSlider); // Actualiza el slider al redimensionar la ventana

sliderImages.addEventListener('mouseover', () => {
    clearInterval(intervalos);
});

sliderImages.addEventListener('mouseout', () => {
    agregarIntervalo();
});

function agregarIntervalo() {
    intervalos = setInterval(nextImage, 3000);
}

agregarIntervalo(); // Inicia el intervalo