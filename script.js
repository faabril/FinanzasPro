/*
SIMULADOR DE FINANZAS PERSONALES
*/

// Estructura de datos principal
const appFinanzas = {
    usuario: "",
    presupuesto: 0,
    gastos: []
};

// Función para validar que un ingreso sea un número válido y positivo
function validarNumero(mensaje) {
    let numero = parseFloat(prompt(mensaje));
    while (isNaN(numero) || numero < 0) {
        numero = parseFloat(prompt("Error: Por favor ingrese un número válido (mayor o igual a 0)."));
    }
    return numero;
}

// 1. Configuración inicial
function configurarPresupuesto() {
    appFinanzas.usuario = prompt("¡Bienvenido! Ingrese su nombre:");
    while (!appFinanzas.usuario) {
        appFinanzas.usuario = prompt("El nombre es obligatorio. Ingrese su nombre:");
    }
    appFinanzas.presupuesto = validarNumero(`Hola ${appFinanzas.usuario}, ¿cuál es tu sueldo o presupuesto mensual?`);
}

// 2. Función para agregar gastos
function agregarGasto() {
    let continuar = true;
    while (continuar) {
        let nombreGasto = prompt("¿En qué gastaste dinero? (Ej: Supermercado, Alquiler, Cine)");
        let montoGasto = validarNumero(`¿Cuánto costó "${nombreGasto}"?`);

        // Creamos el objeto del gasto y lo pusheamos al array
        const nuevoGasto = {
            descripcion: nombreGasto,
            monto: montoGasto
        };
        appFinanzas.gastos.push(nuevoGasto);

        continuar = confirm("¿Deseas agregar otro gasto?");
    }
}

// 3. Funciones de cálculo
function calcularResumen() {
    let totalGastado = 0;
    let listaDetallada = "";

    // Recorremos los gastos para sumar y armar el detalle
    for (const gasto of appFinanzas.gastos) {
        totalGastado += gasto.monto;
        listaDetallada += `- ${gasto.descripcion}: $${gasto.monto}\n`;
    }

    const saldoFinal = appFinanzas.presupuesto - totalGastado;
    let estado = "";

    // Lógica condicional para dar un consejo financiero
    if (saldoFinal < 0) {
        estado = "¡CUIDADO! Estás en déficit (deuda).";
    } else if (saldoFinal < appFinanzas.presupuesto * 0.2) {
        estado = "Atención: Te queda menos del 20% de tu presupuesto.";
    } else {
        estado = "Tu economía está estable. ¡Buen trabajo!";
    }

    alert(`--- RESUMEN DE FINANZAS ---\n` +
          `Usuario: ${appFinanzas.usuario}\n` +
          `Presupuesto Inicial: $${appFinanzas.presupuesto}\n\n` +
          `Gastos registrados:\n${listaDetallada || "No hay gastos"}\n` +
          `Total Gastado: $${totalGastado}\n` +
          `Saldo Restante: $${saldoFinal}\n\n` +
          `Estado: ${estado}`);
}

// 4. Función de inicio (Menú principal)
function iniciarSimulador() {
    configurarPresupuesto();
    
    let opcion;
    do {
        opcion = parseInt(prompt(
            `Hola ${appFinanzas.usuario}\n` +
            "¿Qué deseas hacer?\n" +
            "1. Agregar un gasto\n" +
            "2. Ver resumen y balance\n" +
            "3. Salir"
        ));

        switch (opcion) {
            case 1:
                agregarGasto();
                break;
            case 2:
                if (appFinanzas.gastos.length === 0) {
                    alert("Aún no has cargado gastos.");
                } else {
                    calcularResumen();
                }
                break;
            case 3:
                alert("Gracias por usar el simulador. ¡Hasta pronto!");
                break;
            default:
                alert("Opción no válida.");
        }
    } while (opcion !== 3);
}

// Ejecución del programa
iniciarSimulador();