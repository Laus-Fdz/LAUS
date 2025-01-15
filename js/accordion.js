// ----------------------------------------------------
//                 ACORDEÓN ABOUT ME
// ----------------------------------------------------

// ----------------------------------------------------
//  1. Creamos constantes y variables
// ----------------------------------------------------
const headers = document.querySelectorAll(".Acordeon-header");  
const items = document.querySelectorAll(".Acordeon-item");      


// ----------------------------------------------------
//  2. Eventlistener y funciones
// ----------------------------------------------------
headers.forEach( header => {
    header.addEventListener("click", () => {  
        const item = header.closest(".Acordeon-item");

        // quitar el active de todos los elementos
        items.forEach( elemento => {
            elemento.classList.remove("active");
        });

        // agregar el active al item actual
        item.classList.add("active");
    });
});

// -----------------------------------------------------------
// 3. Iniciamos el código
// -----------------------------------------------------------
headers[0].click();