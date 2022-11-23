const apartadoHome = document.querySelector(".home")
const apartadoProductos = document.querySelector(".productos")
const apartadoCarrito = document.querySelector(".carrito")
const apartadoContacto = document.querySelector(".contacto")
const contenedorDestacados = document.querySelector(".productos-destacados")
const resultadosDestacados = document.querySelector (".subtitle-resultados")
const navHome = document.querySelector("#home-nav")
const navProductos = document.querySelector("#products-nav")
const navEmptyCart = document.querySelector("#empty-cart-nav")
const navFillCart = document.querySelector("#cart-fill-nav")
const navContacto = document.querySelector("#contact-nav")
const containerProductos = document.querySelector(".container-cards")

const navegacion = ( trigger, visible , oculto1, oculto2, oculto3  ) => {
    
    trigger.onclick = () => {

        visible.style.display = "block"
        oculto1.style.display = "none"
        oculto2.style.display = "none"
        oculto3.style.display = "none"
    }
}

navegacion( navHome, apartadoHome, apartadoProductos, apartadoCarrito, apartadoContacto )
navegacion( navProductos, apartadoProductos, apartadoHome, apartadoCarrito, apartadoContacto )
navegacion( navEmptyCart, apartadoCarrito, apartadoHome, apartadoProductos, apartadoContacto)
navegacion( navFillCart, apartadoCarrito, apartadoHome, apartadoProductos, apartadoContacto)
navegacion( navContacto, apartadoContacto, apartadoHome, apartadoProductos, apartadoCarrito )

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

const cardsAHtml =  array => {
    const arrayReduc = array.reduce( ( acc, curr ) => {
        return acc + `
            <article class="card" id=${curr.id}>
                <div class="container-img">
                    <img src=${curr.img[0]} alt="producto ${curr.id}">
                </div>
                <div class="container-sub">
                    <div class="sub-card">
                        <h2>
                            ${curr.producto}
                        </h2>
                        ${ 
                            curr.destacado === true ? 
                                `<h3>
                                    30% OFF
                                </h3>`
                                :
                                ""
                        }
                    </div>                    
                        <h3 class="precio-producto">
                            $${curr.destacado === true ? curr.precio - ((curr.precio * 30) / 100) : curr.precio}
                        </h3>
                        <button class="agregar-carrito">
                            Añadir al carrito
                        </button>                    
                </div>
            </article>
        `
    }, "")

    return arrayReduc
} 

const fetchProductos = async () => {
    const res = await fetch("productos.json")
    const data = await res.json()
    resultadosDestacados.innerHTML = `${filterDestacados(data).length} Resultados` 
    contenedorDestacados.innerHTML = cardsAHtml(filterDestacados(data))
    containerProductos.innerHTML = cardsAHtml(data)
}

fetchProductos()

