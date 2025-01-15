// ----------------------------------------------------
//                 TABS DE PRODUCTOS
// ----------------------------------------------------

// -----------------------------------------------------------
// 1. Crear variables y constantes 
// -----------------------------------------------------------
const listButtons = document.querySelectorAll(".Tabs-button");
const listPages = document.querySelectorAll(".Tabs-contenido");

// ----------------------------------------------------
//  2. Eventlistener y funciones
// ----------------------------------------------------

listButtons.forEach(button => {
    button.addEventListener("click", () => {
        // quitar clases de todos los tabs
        listButtons.forEach(item => item.classList.remove("u-active"));
        listPages.forEach(pagina => pagina.classList.remove("u-visible"));

        // Agregar clases al tab y contenido seleccionados
        button.classList.add("u-active");
        const targetId = button.dataset.tab;
        const target = document.getElementById(targetId);
        target.classList.add("u-visible");
    });
});

// Activar la primera pestaña por defecto

if (listButtons.length > 0) {
    listButtons[0].click();
}