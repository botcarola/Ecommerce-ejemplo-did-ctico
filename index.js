// DOM
const contenedorProductos = document.querySelector(".productos")
const contenedorDestacados = document.querySelector(".productos-destacados")
const resultadosDestacados = document.querySelector (".subtitle-resultados")


// Carrousel
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const filterDestacados = array => array.filter( curr => curr.destacado === true)

const destacadosHtml =  array => {
    const arrayReduc = array.reduce( ( acc, curr ) => {
        return acc + `
            <article class="card">
                <div class="container-img">
                    <img src=${curr.img[0]} alt="producto ${curr.id}">
                </div>
                <div class="container-sub">
                    <div class="sub-card">
                        <h2>
                            ${curr.producto}
                        </h2>
                        <h3>
                            ${curr.destacado === true && "30% OFF" }
                        </h3>
                    </div>
                    <h3 class="precio-producto">
                        $${curr.destacado === true ? curr.precio - ((curr.precio * 30) / 100) : curr.precio}
                    </h3>
                </div>
            </article>
        `
    }, "")

    return arrayReduc
} 

const destacadosHome = async () => {
    const res = await fetch("productos.json")
    const data = await res.json()
    resultadosDestacados.innerHTML = `${filterDestacados(data).length} Resultados` 
    contenedorDestacados.innerHTML = destacadosHtml(filterDestacados(data))
}

destacadosHome()


