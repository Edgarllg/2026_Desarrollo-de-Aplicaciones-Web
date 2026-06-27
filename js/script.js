// ==============================
// OBTENER ELEMENTOS DEL HTML
// ==============================

const formulario = document.getElementById("formVehiculo");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const precio = document.getElementById("precio");

const listaVehiculos = document.getElementById("listaVehiculos");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

let totalVehiculos = 0;

// ==============================
// EVENTO SUBMIT
// ==============================

formulario.addEventListener("submit", function(event){

    // Evita que la página se recargue
    event.preventDefault();

    // Obtener datos
    let marcaValor = marca.value.trim();
    let modeloValor = modelo.value.trim();
    let precioValor = precio.value.trim();

    // ==============================
    // VALIDACIÓN
    // ==============================

    if(marcaValor === "" || modeloValor === "" || precioValor === ""){

        mensaje.innerHTML = `
            <div class="alert alert-danger mt-3">
                Complete todos los campos.
            </div>
        `;

        return;

    }

    // ==============================
    // MENSAJE DE ÉXITO
    // ==============================

    mensaje.innerHTML = `
        <div class="alert alert-success mt-3">
            Vehículo registrado correctamente.
        </div>
    `;

    // ==============================
    // CREAR COLUMNA
    // ==============================

    const columna = document.createElement("div");

    columna.classList.add("col-md-4");

    // ==============================
    // CREAR TARJETA
    // ==============================

    const tarjeta = document.createElement("div");

    tarjeta.classList.add(
        "card",
        "shadow",
        "mb-4"
    );

    // ==============================
    // BODY DE LA TARJETA
    // ==============================

    const cuerpo = document.createElement("div");

    cuerpo.classList.add("card-body");

    // ==============================
    // ICONO
    // ==============================

    const icono = document.createElement("h1");

    icono.classList.add("text-center");

    icono.innerHTML = "🚗";

    // ==============================
    // TÍTULO
    // ==============================

    const titulo = document.createElement("h4");

    titulo.classList.add(
        "text-center",
        "mb-3"
    );

    titulo.textContent = marcaValor + " " + modeloValor;

    // ==============================
    // PRECIO
    // ==============================

    const precioTexto = document.createElement("h5");

    precioTexto.classList.add(
        "text-danger",
        "text-center"
    );

    precioTexto.textContent = "$ " + precioValor;

    // ==============================
    // DESCRIPCIÓN
    // ==============================

    const descripcion = document.createElement("p");

    descripcion.classList.add("text-center");

    descripcion.textContent =
    "Vehículo agregado al catálogo de AutoDrive.";

    // ==============================
    // BOTÓN ELIMINAR
    // ==============================

    const botonEliminar = document.createElement("button");

    botonEliminar.textContent = "Eliminar";

    botonEliminar.classList.add(
        "btn",
        "btn-danger",
        "w-100",
        "mt-3"
    );

    // ==============================
    // EVENTO CLICK
    // ==============================

    botonEliminar.addEventListener("click", function(){

        columna.remove();

        totalVehiculos--;

        contador.textContent = totalVehiculos;

    });

    // ==============================
    // AGREGAR ELEMENTOS
    // ==============================

    cuerpo.appendChild(icono);

    cuerpo.appendChild(titulo);

    cuerpo.appendChild(precioTexto);

    cuerpo.appendChild(descripcion);

    cuerpo.appendChild(botonEliminar);

    tarjeta.appendChild(cuerpo);

    columna.appendChild(tarjeta);

    listaVehiculos.appendChild(columna);

    // ==============================
    // CONTADOR
    // ==============================

    totalVehiculos++;

    contador.textContent = totalVehiculos;

    // ==============================
    // LIMPIAR FORMULARIO
    // ==============================

    formulario.reset();

});