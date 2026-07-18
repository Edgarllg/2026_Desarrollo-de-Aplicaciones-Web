// ==========================================================================
// DATOS DEL PROYECTO (ARREGLO DE OBJETOS)
// --------------------------------------------------------------------------
// En una plantilla real (Jinja2, Handlebars, etc.) estos datos vendrían
// del backend. Aquí simulamos esa fuente de datos con un arreglo de
// objetos en JavaScript, que luego es "renderizado" dinámicamente sobre
// el HTML, igual que haría un motor de plantillas con {% for %}.
// ==========================================================================
let vehiculosData = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        precio: 22900,
        tipo: "Sedán",
        descripcion: "Año 2025, motor 1.8, transmisión automática.",
        imagen: "img/toyota.jpg"
    },
    {
        id: 2,
        marca: "Chevrolet",
        modelo: "Sail",
        precio: 16500,
        tipo: "Sedán",
        descripcion: "Año 2024, motor 1.5, transmisión manual.",
        imagen: "img/chevrolet.jpg"
    },
    {
        id: 3,
        marca: "Kia",
        modelo: "Sportage",
        precio: 31900,
        tipo: "SUV",
        descripcion: "Año 2025, motor 2.0, transmisión automática.",
        imagen: "img/sportage.jpg"
    }
];

// Contador para asignar un id único a cada vehículo nuevo
let siguienteId = 4;

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const formulario = document.getElementById("formVehiculo");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const precio = document.getElementById("precio");
const tipo = document.getElementById("tipo");
const descripcion = document.getElementById("descripcion");

const errorMarca = document.getElementById("errorMarca");
const errorModelo = document.getElementById("errorModelo");
const errorPrecio = document.getElementById("errorPrecio");
const errorTipo = document.getElementById("errorTipo");
const errorDescripcion = document.getElementById("errorDescripcion");

const listaVehiculos = document.getElementById("listaVehiculos");
const mensajeCatalogo = document.getElementById("mensajeCatalogo");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

// Elementos para el spinner de carga inicial
const cargaInicial = document.getElementById("cargaInicial");

// Elementos para el spinner del botón "Agregar Vehículo"
const btnRegistrar = document.getElementById("btnRegistrar");
const spinnerRegistrar = document.getElementById("spinnerRegistrar");
const textoBtnRegistrar = document.getElementById("textoBtnRegistrar");

// Elementos para el modal de detalle
const modalDetalleBody = document.getElementById("modalDetalleBody");
const modalDetalle = new bootstrap.Modal(document.getElementById("modalDetalle"));

// Elementos para el modal de confirmación de eliminación
const modalConfirmarEliminar = new bootstrap.Modal(document.getElementById("modalConfirmarEliminar"));
const nombreVehiculoEliminar = document.getElementById("nombreVehiculoEliminar");
const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");

// Guarda temporalmente el id del vehículo que se quiere eliminar
let idVehiculoAEliminar = null;

// ==========================================================================
// RENDERIZADO DINÁMICO DE LA SECCIÓN PRINCIPAL
// --------------------------------------------------------------------------
// Esta función reemplaza los bloques HTML repetidos manualmente. A partir
// de "vehiculosData" construye todas las tarjetas con una ESTRUCTURA
// REPETITIVA (forEach) y decide qué mostrar con una CONDICIÓN según el
// estado de los datos (arreglo vacío o con elementos).
// ==========================================================================
function renderizarVehiculos() {
    // Limpiar el contenedor antes de volver a "pintar" los datos
    listaVehiculos.innerHTML = "";

    // ----------------------------------------------------------------
    // CONDICIÓN según el estado de los datos
    // ----------------------------------------------------------------
    if (vehiculosData.length === 0) {
        mensajeCatalogo.innerHTML = `
            <div class="alert alert-info text-center">
                No hay vehículos registrados por el momento. Agrega uno desde el formulario.
            </div>
        `;
        contador.textContent = 0;
        return;
    }

    mensajeCatalogo.innerHTML = "";

    // ----------------------------------------------------------------
    // ESTRUCTURA REPETITIVA: recorre el arreglo y genera una tarjeta
    // por cada vehículo (equivalente a {% for vehiculo in vehiculos %})
    // ----------------------------------------------------------------
    vehiculosData.forEach(function (vehiculo) {
        const columna = document.createElement("div");
        columna.classList.add("col-md-4");

        // Si el vehículo tiene imagen (datos iniciales), se muestra la foto.
        // Si no tiene (vehículos agregados desde el formulario), se usa un ícono.
        const imagenHTML = vehiculo.imagen
            ? `<img src="${vehiculo.imagen}" class="card-img-top" alt="${vehiculo.marca} ${vehiculo.modelo}">`
            : `<h1 class="text-center mt-3">🚗</h1>`;

        columna.innerHTML = `
            <div class="card shadow mb-4">
                ${imagenHTML}
                <div class="card-body text-center">
                    <h4 class="mb-1">${vehiculo.marca} ${vehiculo.modelo}</h4>
                    <p class="text-muted mb-1">${vehiculo.tipo}</p>
                    <h5 class="text-danger">$ ${vehiculo.precio}</h5>
                    <p>${vehiculo.descripcion}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary w-50 btn-detalle" data-id="${vehiculo.id}">
                            Detalles
                        </button>
                        <button class="btn btn-danger w-50 btn-eliminar" data-id="${vehiculo.id}">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;

        listaVehiculos.appendChild(columna);
    });

    contador.textContent = vehiculosData.length;

    // Botón "Detalles": abre el modal con la información completa del vehículo
    document.querySelectorAll(".btn-detalle").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            mostrarDetalleVehiculo(id);
        });
    });

    // Botón "Eliminar": abre el modal de confirmación antes de borrar
    document.querySelectorAll(".btn-eliminar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            solicitarEliminarVehiculo(id);
        });
    });
}

// Busca un vehículo por id y muestra sus datos completos en el modal de detalle
function mostrarDetalleVehiculo(id) {
    const vehiculo = vehiculosData.find(function (v) {
        return v.id === id;
    });

    if (!vehiculo) return;

    modalDetalleBody.innerHTML = `
        <p><strong>Marca:</strong> ${vehiculo.marca}</p>
        <p><strong>Modelo:</strong> ${vehiculo.modelo}</p>
        <p><strong>Tipo:</strong> ${vehiculo.tipo}</p>
        <p><strong>Precio:</strong> $ ${vehiculo.precio}</p>
        <p><strong>Descripción:</strong> ${vehiculo.descripcion}</p>
    `;

    modalDetalle.show();
}

// Guarda el id pendiente de eliminar y muestra el modal de confirmación
function solicitarEliminarVehiculo(id) {
    const vehiculo = vehiculosData.find(function (v) {
        return v.id === id;
    });

    if (!vehiculo) return;

    idVehiculoAEliminar = id;
    nombreVehiculoEliminar.textContent = `${vehiculo.marca} ${vehiculo.modelo}`;
    modalConfirmarEliminar.show();
}

// Evento del botón "Eliminar" dentro del modal de confirmación
btnConfirmarEliminar.addEventListener("click", function () {
    if (idVehiculoAEliminar !== null) {
        eliminarVehiculo(idVehiculoAEliminar);
        idVehiculoAEliminar = null;
    }
    modalConfirmarEliminar.hide();
});

// Elimina un vehículo del arreglo de datos y vuelve a renderizar
function eliminarVehiculo(id) {
    vehiculosData = vehiculosData.filter(function (vehiculo) {
        return vehiculo.id !== id;
    });
    renderizarVehiculos();
}

// ==========================================================================
// FUNCIONES DE APOYO VISUAL (VALIDACIONES - SEMANA 6)
// ==========================================================================

// Marca un campo como válido (Bootstrap: is-valid)
function marcarValido(campo, campoError) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    campoError.textContent = "";
}

// Marca un campo como inválido (Bootstrap: is-invalid) y muestra el mensaje
function marcarInvalido(campo, campoError, mensajeError) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    campoError.textContent = mensajeError;
}

// Muestra un mensaje general de éxito o error debajo del formulario
function mostrarMensajeGeneral(tipoAlerta, texto) {
    mensaje.innerHTML = `
        <div class="alert alert-${tipoAlerta} mt-3">
            ${texto}
        </div>
    `;
}

// ==========================================================================
// FUNCIONES DE VALIDACIÓN (REUTILIZABLES - SEMANA 6)
// ==========================================================================

// Valida campos de texto obligatorios con longitud mínima (marca, modelo)
function validarTexto(campo, campoError, minLength, nombreCampo) {
    const valor = campo.value.trim();

    if (valor === "") {
        marcarInvalido(campo, campoError, `El campo ${nombreCampo} es obligatorio.`);
        return false;
    }

    if (valor.length < minLength) {
        marcarInvalido(campo, campoError, `El campo ${nombreCampo} debe tener al menos ${minLength} caracteres.`);
        return false;
    }

    marcarValido(campo, campoError);
    return true;
}

// Valida que el precio no esté vacío y sea un número mayor a 0
function validarPrecio(campo, campoError) {
    const valor = campo.value.trim();

    if (valor === "") {
        marcarInvalido(campo, campoError, "El precio es obligatorio.");
        return false;
    }

    const numero = parseFloat(valor);

    if (isNaN(numero) || numero <= 0) {
        marcarInvalido(campo, campoError, "Ingrese un precio válido mayor a 0.");
        return false;
    }

    marcarValido(campo, campoError);
    return true;
}

// Valida que se haya seleccionado una opción del select (tipo de vehículo)
function validarSelect(campo, campoError) {
    if (campo.value === "") {
        marcarInvalido(campo, campoError, "Seleccione un tipo de vehículo.");
        return false;
    }

    marcarValido(campo, campoError);
    return true;
}

// Valida que la descripción tenga información suficiente
function validarDescripcion(campo, campoError, minLength) {
    const valor = campo.value.trim();

    if (valor === "") {
        marcarInvalido(campo, campoError, "La descripción es obligatoria.");
        return false;
    }

    if (valor.length < minLength) {
        marcarInvalido(campo, campoError, `La descripción debe tener al menos ${minLength} caracteres.`);
        return false;
    }

    marcarValido(campo, campoError);
    return true;
}

// Ejecuta todas las validaciones del formulario y devuelve true solo si todo es correcto
function validarFormulario() {
    const marcaValida = validarTexto(marca, errorMarca, 3, "marca");
    const modeloValido = validarTexto(modelo, errorModelo, 2, "modelo");
    const precioValido = validarPrecio(precio, errorPrecio);
    const tipoValido = validarSelect(tipo, errorTipo);
    const descripcionValida = validarDescripcion(descripcion, errorDescripcion, 10);

    return marcaValida && modeloValido && precioValido && tipoValido && descripcionValida;
}

// Limpia clases y mensajes de validación después de un registro exitoso
function limpiarEstadosFormulario() {
    [marca, modelo, precio, tipo, descripcion].forEach(function (campo) {
        campo.classList.remove("is-valid", "is-invalid");
    });

    [errorMarca, errorModelo, errorPrecio, errorTipo, errorDescripcion].forEach(function (campoError) {
        campoError.textContent = "";
    });
}

// ==========================================================================
// VALIDACIONES EN TIEMPO REAL (input / blur) - SEMANA 6
// ==========================================================================

marca.addEventListener("input", () => validarTexto(marca, errorMarca, 3, "marca"));
marca.addEventListener("blur", () => validarTexto(marca, errorMarca, 3, "marca"));

modelo.addEventListener("input", () => validarTexto(modelo, errorModelo, 2, "modelo"));
modelo.addEventListener("blur", () => validarTexto(modelo, errorModelo, 2, "modelo"));

precio.addEventListener("input", () => validarPrecio(precio, errorPrecio));
precio.addEventListener("blur", () => validarPrecio(precio, errorPrecio));

tipo.addEventListener("change", () => validarSelect(tipo, errorTipo));
tipo.addEventListener("blur", () => validarSelect(tipo, errorTipo));

descripcion.addEventListener("input", () => validarDescripcion(descripcion, errorDescripcion, 10));
descripcion.addEventListener("blur", () => validarDescripcion(descripcion, errorDescripcion, 10));

// ==========================================================================
// EVENTO SUBMIT DEL FORMULARIO
// --------------------------------------------------------------------------
// Valida los datos, muestra un spinner simulando el proceso de guardado,
// agrega el vehículo al arreglo "vehiculosData" (fuente de datos) y
// vuelve a renderizar la sección dinámica.
// ==========================================================================
formulario.addEventListener("submit", function (event) {
    // Evita que la página se recargue
    event.preventDefault();

    // Ejecuta todas las validaciones
    const formularioValido = validarFormulario();

    if (!formularioValido) {
        mostrarMensajeGeneral("danger", "Por favor corrige los errores señalados antes de registrar el vehículo.");
        return;
    }

    // Mostrar spinner en el botón y deshabilitarlo mientras se "guarda"
    btnRegistrar.disabled = true;
    spinnerRegistrar.classList.remove("d-none");
    textoBtnRegistrar.textContent = "Guardando...";

    // Simula un proceso de guardado (por ejemplo, una petición al servidor)
    setTimeout(function () {
        // Crear el nuevo objeto vehículo a partir de los datos del formulario
        const nuevoVehiculo = {
            id: siguienteId++,
            marca: marca.value.trim(),
            modelo: modelo.value.trim(),
            precio: parseFloat(precio.value.trim()),
            tipo: tipo.value,
            descripcion: descripcion.value.trim()
        };

        // Agregar el nuevo vehículo a los datos y renderizar de nuevo
        vehiculosData.push(nuevoVehiculo);
        renderizarVehiculos();

        // Mensaje de éxito
        mostrarMensajeGeneral("success", "Vehículo registrado correctamente.");

        // Limpiar formulario y estados visuales
        formulario.reset();
        limpiarEstadosFormulario();

        // Restaurar el botón a su estado normal
        btnRegistrar.disabled = false;
        spinnerRegistrar.classList.add("d-none");
        textoBtnRegistrar.textContent = "Agregar Vehículo";
    }, 800);
});

// ==========================================================================
// SPINNER DE CARGA INICIAL
// --------------------------------------------------------------------------
// Simula una carga de datos desde el servidor antes de mostrar el catálogo.
// ==========================================================================
setTimeout(function () {
    renderizarVehiculos();
    cargaInicial.classList.add("d-none");
}, 1000);