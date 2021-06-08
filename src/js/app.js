document.addEventListener('DOMContentLoaded', function() {
    scrollNav();

    navegacionFija();
})



function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a') // el a Selecciona los enlaces de la clase '.navegacion-principal'

    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(e.target.attributes.href.value)
            const seccion = document.querySelector(e.target.attributes.href.value)

            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        })
    })

}


function navegacionFija() {

    const barraNav = document.querySelector('.header');

    // Registrar la API Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            barraNav.classList.remove('fijo');
        } else {
            barraNav.classList.add('fijo');
        }
    })

    // Elemento a Observar
    observer.observe(document.querySelector('.sobre-festival'));
}