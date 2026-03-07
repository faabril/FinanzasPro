# FinanzasPro - Simulador de Gastos Inteligente 🚀

**FinanzasPro** es una aplicación web interactiva diseñada para la gestión de finanzas personales. Permite a los usuarios establecer un presupuesto mensual, registrar gastos categorizados y recibir consejos financieros dinámicos.

---

## 🌟 Características Principales

1. **Gestión de Presupuesto**: Configuración inicial de usuario y capital disponible.
2. **Registro de Gastos**: Clasificación por categorías (Comida, Servicios, Ocio, Varios).
3. **Persistencia de Datos**: Uso de `localStorage` para mantener la información tras recargar la página.
4. **Filtrado Avanzado**: Visualización selectiva de gastos por categoría.
5. **Asincronismo**: Carga de consejos financieros aleatorios mediante un archivo JSON local.
6. **Interfaz de Usuario (UX)**: Notificaciones estéticas y alertas dinámicas.

---

## 🛠️ Herramientas y Tecnologías

### 1. JavaScript Avanzado
* **Fetch & Async/Await**: Se utiliza para consumir el archivo `sugerencias.json`, simulando una petición a una API externa para mostrar consejos al usuario.
* **DOM & Eventos**: Manipulación dinámica del HTML sin eventos en línea (inline).
* **Métodos de Array**: Uso intensivo de `.filter()` para búsqueda/borrado y `.reduce()` para el cálculo de balances.

### 2. Librerías Externas
* **SweetAlert2**: Implementada para ventanas modales de bienvenida y confirmaciones críticas (como borrar un gasto).
* **Toastify JS**: Utilizada para notificaciones rápidas y no intrusivas, como el aviso de "Gasto Agregado" o alertas de "Presupuesto Excedido".
* **Bootstrap 5**: Framework de estilos para garantizar un diseño responsivo y profesional.

---

## 📖 Cómo utilizar la aplicación

1. **Inicia tu sesión**: Ingresa tu nombre y tu presupuesto del mes.
2. **Lee el consejo**: En la parte superior aparecerá un consejo financiero cargado asincrónicamente.
3. **Carga tus gastos**: Completa el formulario y verás cómo tu saldo se actualiza en tiempo real.
4. **Controla**: Si tu saldo restante llega a ser negativo, recibirás una alerta visual inmediata.
5. **Filtra**: Utiliza el selector de categorías para analizar en qué estás gastando más.

---

Desarrollado por **Fabrizio** - 2026.