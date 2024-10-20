// Variables
let balance = 0;
let ingresos = 0;
let egresos = 0;

// Referencias a elementos del DOM
const balanceElement = document.getElementById('balance');
const ingresosElement = document.getElementById('ingresos');
const egresosElement = document.getElementById('egresos');
const porcentajeElement = document.getElementById('porcentaje');
const listaIngresos = document.getElementById('lista-ingresos');
const listaEgresos = document.getElementById('lista-egresos');
const agregarBtn = document.getElementById('agregar-btn');

// Referencias a pestañas
const tabIngresos = document.getElementById('tab-ingresos');
const tabEgresos = document.getElementById('tab-egresos');

// Cálculo dinámico del mes y año
const mesElement = document.getElementById('mes');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const fechaActual = new Date();
const mesActual = meses[fechaActual.getMonth()];
const anioActual = fechaActual.getFullYear();
mesElement.textContent = `${mesActual} ${anioActual}`;

// Función para alternar entre pestañas
tabIngresos.addEventListener('click', function () {
    tabIngresos.classList.add('active');
    tabEgresos.classList.remove('active');
    listaIngresos.classList.remove('d-none');
    listaEgresos.classList.add('d-none');
});

tabEgresos.addEventListener('click', function () {
    tabEgresos.classList.add('active');
    tabIngresos.classList.remove('active');
    listaEgresos.classList.remove('d-none');
    listaIngresos.classList.add('d-none');
});

// Función para agregar transacciones
agregarBtn.addEventListener('click', function () {
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);

    if (descripcion && !isNaN(monto) && monto > 0) {
        const li = document.createElement('li');
        if (tipo === 'ingreso') {
            li.innerHTML = `${descripcion} <span>+ $${monto.toFixed(2)}</span>`;
            listaIngresos.appendChild(li);
        } else {
            const porcentajeEgreso = ingresos > 0 ? (monto / ingresos) * 100 : 0;
            li.innerHTML = `${descripcion} <span>- $${monto.toFixed(2)} (${porcentajeEgreso.toFixed(2)}%)</span>`;
            listaEgresos.appendChild(li);
        }
        li.classList.add(tipo === 'ingreso' ? 'ingreso' : 'egreso');

        actualizarBalance(tipo, monto);
    } else {
        alert("Por favor, ingrese una descripción y un monto válido.");
    }

    // Limpiar campos
    document.getElementById('descripcion').value = '';
    document.getElementById('monto').value = '';
});

// Función para actualizar el balance
function actualizarBalance(tipo, monto) {
    if (tipo === 'ingreso') {
        ingresos += monto;
        balance += monto;
    } else {
        egresos += monto;
        balance -= monto;
    }

    // Actualizar el DOM
    balanceElement.textContent = `$${balance.toFixed(2)}`;
    ingresosElement.textContent = `+ $${ingresos.toFixed(2)}`;
    egresosElement.textContent = `- $${egresos.toFixed(2)}`;
    
    const porcentaje = egresos > 0 ? (egresos / ingresos) * 100 : 0;
    porcentajeElement.textContent = `${porcentaje.toFixed(2)}%`;
}
