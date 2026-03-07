/* ENTREGA FINAL - FINANZAS PRO
Incluye: Fetch, Async/Await, Librerías (SweetAlert2 y Toastify)
*/

class Gasto {
    constructor(id, descripcion, monto, categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.monto = parseFloat(monto);
        this.categoria = categoria;
    }
}

// Datos Globales
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;
let presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || 0;
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Elementos DOM
const listaGastosUI = document.getElementById("listaGastos");
const contenedorConsejo = document.getElementById("contenedor-consejo");

// --- ASINCRONISMO: FETCH ---
const cargarConsejoAleatorio = async () => {
    try {
        const resp = await fetch('./sugerencias.json');
        const data = await resp.json();
        const random = Math.floor(Math.random() * data.length);
        contenedorConsejo.innerText = `💡 Consejo del día: ${data[random].consejo}`;
    } catch (error) {
        contenedorConsejo.innerText = "Gestiona tus finanzas con responsabilidad.";
        console.warn("Error cargando JSON:", error);
    }
};

// --- LÓGICA DE CÁLCULOS Y RENDER ---
const actualizarResumen = () => {
    const total = gastos.reduce((acc, g) => acc + g.monto, 0);
    const restante = presupuesto - total;
    const color = restante < 0 ? "text-danger" : "text-success";
    
    // Toastify si el saldo es negativo
    if (restante < 0) {
        Toastify({
            text: "⚠️ Estás excediendo tu presupuesto",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
        }).showToast();
    }

    document.getElementById("contenedorTotal").innerHTML = `
        <div class="d-flex justify-content-between small"><span>Gastado:</span> <span>$${total}</span></div>
        <div class="d-flex justify-content-between fw-bold"><span>Restante:</span> <span class="${color}">$${restante}</span></div>
    `;
};

const renderizarGastos = (gastosFiltrados = gastos) => {
    listaGastosUI.innerHTML = "";
    gastosFiltrados.forEach(({ id, descripcion, monto, categoria }) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-2 animate-item";
        li.innerHTML = `
            <div><span class="badge-categoria d-block mb-1">${categoria}</span><strong>${descripcion}</strong></div>
            <div class="d-flex align-items-center"><span class="me-3 fw-bold">$${monto}</span>
            <button class="btn btn-outline-danger btn-sm rounded-circle btn-borrar" data-id="${id}">×</button></div>
        `;
        listaGastosUI.appendChild(li);
    });

    // Eventos de borrado dinámicos (Corrección Profesor)
    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            confirmarEliminacion(id);
        });
    });
    actualizarResumen();
};

// --- LIBRERÍA: SWEET ALERT 2 ---
const confirmarEliminacion = (id) => {
    Swal.fire({
        title: '¿Eliminar gasto?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar'
    }).then((result) => {
        if (result.isConfirmed) {
            gastos = gastos.filter(g => g.id !== id);
            localStorage.setItem("gastos", JSON.stringify(gastos));
            renderizarGastos();
            Swal.fire('Eliminado', 'El gasto fue borrado.', 'success');
        }
    });
};

// --- INICIALIZACIÓN Y EVENTOS ---
const iniciarApp = () => {
    if (usuario) {
        document.getElementById("card-config").classList.add("d-none");
        document.getElementById("card-gastos").classList.remove("d-none");
        renderizarGastos();
    }
    cargarConsejoAleatorio();
};

document.getElementById("formConfig").addEventListener("submit", (e) => {
    e.preventDefault();
    usuario = document.getElementById("nombreUsuario").value;
    presupuesto = parseFloat(document.getElementById("montoPresupuesto").value);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    
    Swal.fire({
        title: `¡Bienvenido ${usuario}!`,
        text: 'Tu presupuesto ha sido configurado.',
        icon: 'success',
        timer: 2000
    });
    iniciarApp();
});

document.getElementById("formGasto").addEventListener("submit", (e) => {
    e.preventDefault();
    const desc = document.getElementById("conceptoGasto").value;
    const monto = document.getElementById("montoGasto").value;
    const cat = document.getElementById("categoriaGasto").value;
    
    gastos.push(new Gasto(Date.now(), desc, monto, cat));
    localStorage.setItem("gastos", JSON.stringify(gastos));
    renderizarGastos();
    document.getElementById("formGasto").reset();
    
    Toastify({ text: "Gasto agregado", duration: 2000, style: { background: "#27ae60" } }).showToast();
});

document.getElementById("filtroCategoria").onchange = (e) => {
    const seleccion = e.target.value;
    renderizarGastos(seleccion === "Todos" ? gastos : gastos.filter(g => g.categoria === seleccion));
};

document.getElementById("btnReiniciar").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

iniciarApp();