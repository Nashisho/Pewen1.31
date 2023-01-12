/* INTENTO DE SCROLL NAV */
/* window.addEventListener('scroll', function(){
    var header = document.querySelector('header');
    header.classList.toggle('scrollear', this.window.scrollY>0);
})

TERMINAR EN PROXIMA ENTREGA */

/* MODAL  FAIL HACIA ABAJO */

/* const abrir = document.getElementById('abrir');
const modal_car = document.getElementById('modal_car');
const cerrar = document.getElementById('cerrar');

abrir.addEventListener('click', () => {
    modal_car.classList.add('show')
    alert("olakaze)
});

cerrar.addEventListener('click', () => {
    modal_car.classList.remove('show')
});
 */
/* MODAL FALLIDO HACIA ARRIBA PROXIMA ENTREGA*/

const items = document.getElementById('items')
const items2 = document.getElementById('items2')
const footer = document.getElementById('footer')
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito= {
    cuponApplied: false
}

document.addEventListener('DOMContentLoaded', () => { fetchData()
    if(localStorage.getItem('compras')){
        carrito = JSON.parse(localStorage.getItem('compras'))
        llenarCarrito()
    }
})
items.addEventListener('click', e =>{
    addCarrito(e)
})
items2.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarCards(data)
    }catch(error){  
        console.log(error) /* opcional */ 
    }
}


const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h4').textContent = item.nombre
        templateCard.querySelector('span').textContent = item.precio
        templateCard.querySelector('img').setAttribute("src", item.imagen)
        templateCard.querySelector('.boton-carro').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    }

const addCarrito = e =>{
    if (e.target.classList.contains('boton-carro')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}
const setCarrito = objeto =>{
    const producto ={
        id: objeto.querySelector('.boton-carro').dataset.id,
        nombre: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad+1
    }
    carrito[producto.id] = {...producto}
    llenarCarrito()
}
/*  PRODUCTOS HACIA ARRIBA*/
/* INTENTO DE CARRITO HACIA ABAJO */

const llenarCarrito = () => {
    items2.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
    
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items2.appendChild(fragment)

    llenarFooter()
    localStorage.setItem('compras', JSON.stringify(carrito)) /* STORAGE */
}

const llenarFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length == 0){
        footer.innerHTML = '<th scope="row" colspan="5">Comience a comprar!</th>'
        return /* MALDITO RETURN */
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad,precio} ) => acc + cantidad * precio,0)
    console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnBorrar = document.getElementById('vaciar-carrito')
    btnBorrar.addEventListener('click', () => {
        carrito = {}
        llenarCarrito()
    })
}
const btnAccion = e => {
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        llenarCarrito()
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad== 0){
            delete carrito[e.target.dataset.id]
        }
        llenarCarrito()
    }
    e.stopPropagation()
}

/* LOGIN */
function login (){
    var user, password 
    user = document.getElementById("usuario").value;
    password = document.getElementById("contraseña").value;

    if ( user == "sustantiva" && password == "portafolio"){
        alert("Inicio De Sesion Exitoso");
        window.location = "index.html";
        }else{
            alert("Datos Incorrectos")
        
    }
}
/* CUPON  BASIIIIIIIIIIIIIICO*/
document.getElementById('apply-cupon').addEventListener('click', applyCupon);

function applyCupon() {
    const cuponCode = document.getElementById('cupon-code').value;
    const validCupons = {'DIEGO': 90, 'SUSTANTIVA': 10};
    const discount = validCupons[cuponCode];
    if (discount) {
        Object.values(carrito).forEach(producto =>{
            producto.precio = (producto.precio*(1-discount/100)).toFixed(2);
            producto.total = producto.precio*producto.cantidad;
        });
        localStorage.setItem('compras', JSON.stringify(carrito)); 
        llenarCarrito();
    } else {
        alert("CUPON INVALIDO PRUEBA ESTO: DIEGO o SUSTANTIVA");
    }
}





