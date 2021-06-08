//Crear Galeria en HTML CON JAVASCRIPT  

document.addEventListener('DOMContentLoaded', function() { //'DOMContentLoaded' Ejecuta la funcion cuando el HTML termino de cargarse
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes'); //Asigno la clase del HTML a la variable galeria

    for (let i = 1; i <= 24; i++) { // Ciclo for de 1 a 12 para generar la Imagenes de la Galeria HTML
        const imagen = document.createElement('IMG'); //Asigno la creacion de la Etiqueta <img> a una variable (const = imagen)
        imagen.src = `build/img/thumb/${i}.webp`; // src para que tome las imagenes del path donde estan las mismas, mediante Template Strings

        // Añadir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;
        imagen.dataset.imagenId = i;


        const lista = document.createElement('LI'); // Asigno la creacion de la Etiqueta <li>
        //const container = document.createElement('DIV');
        //container.appendChild(imagen)
        lista.appendChild(imagen); // Inserto <img> dentro del <li>


        galeria.appendChild(lista); // Inserto la etiqueta <li> en la etiqeuta <ul class='galeria-imagenes'>
    }
};


function mostrarImagen(e) {

    const id = parseInt(e.target.dataset.imagenId)
        //console.log(id);

    const imagenGrande = document.createElement('IMG');
    imagenGrande.src = `build/img/grande/${id}.webp`;
    //console.log(imagenGrande);

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagenGrande);
    overlay.classList.add('overlay')

    //Boton para cerrar la Imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('boton-cerrar');

    overlay.appendChild(cerrarImagen);

    // Cerrar imagen con click en el boton
    cerrarImagen.onclick = function() {
        overlay.remove();
    }

    // Cerrar imagen con click en el overlay

    overlay.onclick = function() {
        overlay.remove();
    }


    //Mostrar en HTML

    const body = document.querySelector('body');
    body.appendChild(overlay);

    body.classList.add('fijar-body');

}