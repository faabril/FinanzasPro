/*
SIMULADOR DE FINANZAS PERSONALES
*/
class Gasto {
    constructor(id, descripcion, monto, categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.monto = parseFloat(monto);
        this.categoria = categoria;
    }
}

let usuario = JSON.parse(localStorage.getItem("usuario")) || null;
let presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Captura de elementos DOM
const cardConfig = document.getElementById("card-config");
const cardGastos = document.getElementById("card-gastos");
const listaGastosUI = document.getElementById("listaGastos");
const filtroCategoria = document.getElementById("filtroCategoria");

// RENDERIZADO (Salida al DOM)
const renderizarGastos = (gastosFiltrados = gastos) => {
    listaGastosUI.innerHTML = "";
    gastosFiltrados.forEach(({ id, descripcion, monto, categoria }) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-2";
        li.innerHTML = `
            <div>
                <span class="badge-categoria d-block mb-1">${categoria}</span>
                <strong>${descripcion}</strong>
            </div>
            <div class="d-flex align-items-center">
                <span class="me-3 fw-bold">$${monto}</span>
                <button class="btn btn-outline-danger btn-sm rounded-circle" onclick="eliminarGasto(${id})">×</button>
            </div>
        `;
        listaGastosUI.appendChild(li);
    });
    actualizarResumen();
};

const actualizarResumen = () => {
    const total = gastos.reduce((acc, g) => acc + g.monto, 0);
    const restante = presupuesto - total;
    const color = restante < 0 ? "text-danger" : "text-success";
    
    document.getElementById("contenedorTotal").innerHTML = `
        <div class="d-flex justify-content-between">
            <span>Total Gastado:</span> <span>$${total}</span>
        </div>
        <div class="d-flex justify-content-between fw-bold">
            <span>Saldo Restante:</span> <span class="${color}">$${restante}</span>
        </div>
    `;
};

// EVENTOS
document.getElementById("formConfig").addEventListener("submit", (e) => {
    e.preventDefault();
    usuario = document.getElementById("nombreUsuario").value;
    presupuesto = parseFloat(document.getElementById("montoPresupuesto").value);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    iniciarApp();
});

document.getElementById("formGasto").addEventListener("submit", (e) => {
    e.preventDefault();
    const desc = document.getElementById("conceptoGasto").value;
    const monto = document.getElementById("montoGasto").value;
    const cat = document.getElementById("categoriaGasto").value;
    
    const nuevoGasto = new Gasto(Date.now(), desc, monto, cat);
    gastos.push(nuevoGasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    
    renderizarGastos();
    document.getElementById("formGasto").reset();
});

// FILTRO
filtroCategoria.onchange = (e) => {
    const seleccion = e.target.value;
    if (seleccion === "Todos") {
        renderizarGastos(gastos);
    } else {
        const filtrados = gastos.filter(g => g.categoria === seleccion);
        renderizarGastos(filtrados);
    }
};

window.eliminarGasto = (id) => {
    gastos = gastos.filter(g => g.id !== id);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    renderizarGastos();
};

document.getElementById("btnReiniciar").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

const iniciarApp = () => {
    if (usuario) {
        cardConfig.classList.add("d-none");
        cardGastos.classList.remove("d-none");
        renderizarGastos();
    }
};

iniciarApp();