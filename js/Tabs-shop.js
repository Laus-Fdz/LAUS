// ----------------------------------------------------
//                 TABS DE PRODUCTOS
// ----------------------------------------------------

// Creamos constantes y variables
const listButtons = document.querySelectorAll(".Tabs-button");
const listPages = document.querySelectorAll(".Tabs-contenido");

// Creamos funciones y eventlisteners

listButtons.forEach(boton => {
    boton.addEventListener("click", () => {
        // quitar clases de todos los tabs
        listButtons.forEach(item => item.classList.remove("u-active"));
        listPages.forEach(pagina => pagina.classList.remove("u-visible"));

        // Agregar clases al tab y contenido seleccionados
        boton.classList.add("u-active");
        const targetId = boton.dataset.tab;
        const target = document.getElementById(targetId);
        target.classList.add("u-visible");
    });
});

// Activar la primera pestaña por defecto

if (listButtons.length > 0) {
    listButtons[0].click();
}