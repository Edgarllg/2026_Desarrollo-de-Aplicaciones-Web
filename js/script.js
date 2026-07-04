// ==============================
// OBTENER ELEMENTOS DEL HTML
// ==============================
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
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

let totalVehiculos = 0;

// ==============================
// FUNCIONES DE APOYO VISUAL
// ==============================

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

// ==============================
// FUNCIONES DE VALIDACIÓN (REUTILIZABLES)
// ==============================

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
    [marca, modelo, precio, tipo, descripcion].forEach(campo => {
        campo.classList.remove("is-valid", "is-invalid");
    });

    [errorMarca, errorModelo, errorPrecio, errorTipo, errorDescripcion].forEach(campoError => {
        campoError.textContent = "";
    });
}

// ==============================
// VALIDACIONES EN TIEMPO REAL (input / blur)
// ==============================

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

// ==============================
// FUNCIÓN: CREAR TARJETA DE VEHÍCULO
// ==============================
function crearTarjetaVehiculo(marcaValor, modeloValor, precioValor, tipoValor, descripcionValor) {
    // Columna
    const columna = document.createElement("div");
    columna.classList.add("col-md-4");

    // Tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card", "shadow", "mb-4");

    // Cuerpo de la tarjeta
    const cuerpo = document.createElement("div");
    cuerpo.classList.add("card-body");

    // Icono
    const icono = document.createElement("h1");
    icono.classList.add("text-center");
    icono.innerHTML = "🚗";

    // Título
    const titulo = document.createElement("h4");
    titulo.classList.add("text-center", "mb-2");
    titulo.textContent = marcaValor + " " + modeloValor;

    // Tipo
    const tipoTexto = document.createElement("p");
    tipoTexto.classList.add("text-center", "text-muted", "mb-1");
    tipoTexto.textContent = tipoValor;

    // Precio
    const precioTexto = document.createElement("h5");
    precioTexto.classList.add("text-danger", "text-center");
    precioTexto.textContent = "$ " + precioValor;

    // Descripción
    const descripcionTexto = document.createElement("p");
    descripcionTexto.classList.add("text-center");
    descripcionTexto.textContent = descripcionValor;

    // Botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn", "btn-danger", "w-100", "mt-3");

    botonEliminar.addEventListener("click", function () {
        columna.remove();
        totalVehiculos--;
        contador.textContent = totalVehiculos;
    });

    // Armar tarjeta
    cuerpo.appendChild(icono);
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(tipoTexto);
    cuerpo.appendChild(precioTexto);
    cuerpo.appendChild(descripcionTexto);
    cuerpo.appendChild(botonEliminar);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);
    listaVehiculos.appendChild(columna);

    // Contador
    totalVehiculos++;
    contador.textContent = totalVehiculos;
}

// ==============================
// EVENTO SUBMIT DEL FORMULARIO
// ==============================
formulario.addEventListener("submit", function (event) {
    // Evita que la página se recargue
    event.preventDefault();

    // Ejecuta todas las validaciones
    const formularioValido = validarFormulario();

    if (!formularioValido) {
        mostrarMensajeGeneral("danger", "Por favor corrige los errores señalados antes de registrar el vehículo.");
        return;
    }

    // Obtener datos ya validados
    const marcaValor = marca.value.trim();
    const modeloValor = modelo.value.trim();
    const precioValor = precio.value.trim();
    const tipoValor = tipo.value;
    const descripcionValor = descripcion.value.trim();

    // Crear la tarjeta del vehículo
    crearTarjetaVehiculo(marcaValor, modeloValor, precioValor, tipoValor, descripcionValor);

    // Mensaje de éxito
    mostrarMensajeGeneral("success", "Vehículo registrado correctamente.");

    // Limpiar formulario y estados visuales
    formulario.reset();
    limpiarEstadosFormulario();
});