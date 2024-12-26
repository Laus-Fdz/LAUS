// ----------------------------------------------------
//                 ACORDEÓN ABOUT ME
// ----------------------------------------------------

// 1. Declarar variables y constantes
const headers = document.querySelectorAll(".Acordeon-header");  
const items = document.querySelectorAll(".Acordeon-item");      


// 2. Crear funciones y listeners
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

// 3. Ejecutar el programa (esto lo hace al inicio de la ejecución)
headers[0].click();