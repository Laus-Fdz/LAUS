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










