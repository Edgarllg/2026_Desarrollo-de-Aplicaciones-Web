from flask import Flask, render_template

app = Flask(__name__)

# ------------------------------------------------------------------
# Datos de ejemplo (estáticos). En esta etapa NO se usa base de datos.
# ------------------------------------------------------------------
vehiculos = [
    {"id": 1, "marca": "Toyota", "modelo": "Corolla", "anio": 2024,
     "precio": 24500, "img": "toyota.jpg",
     "descripcion": "Sedán familiar, económico y con excelente respaldo."},
    {"id": 2, "marca": "Chevrolet", "modelo": "Onix", "anio": 2023,
     "precio": 19800, "img": "chevrolet.jpg",
     "descripcion": "Hatchback ideal para ciudad, bajo consumo de combustible."},
    {"id": 3, "marca": "Kia", "modelo": "Sportage", "anio": 2024,
     "precio": 32900, "img": "Sportage.jpg",
     "descripcion": "SUV con tecnología de asistencia al conductor."},
]

clientes = [
    {"id": 1, "nombre": "Edgar Lema", "cedula": "0602345678",
     "telefono": "0991234567", "email": "edgar.lema@uea.edu.ec"},
    {"id": 2, "nombre": "María Sánchez", "cedula": "0603456789",
     "telefono": "0987654321", "email": "maria.sanchez@gmail.com"},
    {"id": 3, "nombre": "Carlos Pérez", "cedula": "0604567890",
     "telefono": "0976543210", "email": "carlos.perez@gmail.com"},
]

proveedores = [
    {"id": 1, "empresa": "Toyota Ecuador S.A.", "contacto": "Ana Torres",
     "telefono": "032945612", "ciudad": "Quito"},
    {"id": 2, "empresa": "GM Ecuador (Chevrolet)", "contacto": "Luis Vega",
     "telefono": "042567890", "ciudad": "Guayaquil"},
    {"id": 3, "empresa": "Kia Import Ecuador", "contacto": "Sofía Ramos",
     "telefono": "032345987", "ciudad": "Riobamba"},
]

facturas = [
    {"id": "F001", "cliente": "Edgar Lema", "vehiculo": "Toyota Corolla 2024",
     "fecha": "2026-08-10", "total": 24500},
    {"id": "F002", "cliente": "María Sánchez", "vehiculo": "Chevrolet Onix 2023",
     "fecha": "2026-08-12", "total": 19800},
    {"id": "F003", "cliente": "Carlos Pérez", "vehiculo": "Kia Sportage 2024",
     "fecha": "2026-08-14", "total": 32900},
]

# ------------------------------------------------------------------
# Rutas
# ------------------------------------------------------------------
@app.route('/')
def index():
    """Página principal informativa (se mantiene de semanas anteriores)."""
    return render_template('index.html')


@app.route('/productos')
def productos():
    """Módulo de vehículos disponibles en el concesionario."""
    return render_template('productos.html', vehiculos=vehiculos)


@app.route('/clientes')
def clientes_view():
    """Módulo de clientes registrados."""
    return render_template('clientes.html', clientes=clientes)


@app.route('/proveedores')
def proveedores_view():
    """Módulo de proveedores / marcas asociadas."""
    return render_template('proveedores.html', proveedores=proveedores)


@app.route('/facturacion')
def facturacion():
    """Módulo de facturación de ventas."""
    return render_template('facturacion.html', facturas=facturas)


if __name__ == '__main__':
    app.run(debug=True)