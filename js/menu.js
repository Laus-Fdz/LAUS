// ----------------------------------------------------
//                  MENÚ MÓVIL 
// ----------------------------------------------------

// ----------------------------------------------------
//  1. Creamos constantes y variables
// ----------------------------------------------------
const menuButton = document.querySelector(".Nav-menu");
const navLinks = document.querySelector(".Nav-menuLinks");

// ----------------------------------------------------
//  2. Eventlistener y funciones
// ----------------------------------------------------
menuButton.addEventListener("click", function () {
    // alternamos la clase active en los enlaces de navegación
    navLinks.classList.toggle("active");
});










