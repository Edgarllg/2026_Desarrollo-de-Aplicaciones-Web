document.addEventListener('DOMContentLoaded', () => {

    // Validación básica del formulario de registro de cliente (demostrativa)
    const formCliente = document.getElementById('formCliente');
    if (formCliente) {
        const btnGuardar = formCliente.closest('.modal-content')
            .querySelector('.btn-primary');

        btnGuardar.addEventListener('click', () => {
            if (formCliente.checkValidity()) {
                alert('Cliente registrado correctamente (datos demostrativos).');
                formCliente.reset();
                bootstrap.Modal.getInstance(
                    document.getElementById('modalNuevoCliente')
                ).hide();
            } else {
                formCliente.reportValidity();
            }
        });
    }

    console.log('AutoDrive - Flask app cargada correctamente.');
});