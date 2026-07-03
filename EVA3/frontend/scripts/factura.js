let tablaFacturas; // variable global para la tabla

window.onload = function () {
    obtenerUsuarios();
    inicializarTablaFacturas();
};

// Inicializar DataTable una sola vez
async function inicializarTablaFacturas() {
    try {
        const respuesta = await fetch('http://localhost:3000/facturas');
        const facturas = await respuesta.json();

        console.log(facturas);

        tablaFacturas = new DataTable('#tablaFacturas', {
            data: facturas,
            destroy: true,
            columns: [
                { data: 'numero' },
                { data: 'proveedor' },
                { data: 'fecha' },
                { data: 'monto' },
                { data: 'impuesto' },
                { data: 'total' },
                { data: 'estado' },
                { data: 'metodoPago' },
                { data: 'usuario.nombre' }, // nombre del usuario
                { data: 'usuario.rut' }     // rut del usuario
            ]
        });
    } catch (error) {
        console.log('Error al cargar facturas: ', error);
    }
}

// Nueva función para limpiar validaciones
function limpiarValidaciones() {
    const campos = document.querySelectorAll('#registroFactura input, #registroFactura select, #registroFactura textarea');
    campos.forEach(campo => {
        campo.classList.remove('is-valid');
        campo.classList.remove('is-invalid');
    });
}

// Validar y enviar formulario de factura
function validarFormularioFactura() {
    let numero = document.getElementById('inputNumero');
    let proveedor = document.getElementById('inputProveedor');
    let fecha = document.getElementById('inputFecha');
    let monto = document.getElementById('inputMonto');
    let impuesto = document.getElementById('inputImpuesto');
    let total = document.getElementById('inputTotal');
    let estado = document.getElementById('selectEstado');
    let metodoPago = document.getElementById('selectMetodoPago');
    let usuario = document.getElementById('selectUsuario');
    let formularioValido = true;

    if (!validarCampo(numero)) formularioValido = false;
    if (!validarCampo(proveedor)) formularioValido = false;
    if (!validarFecha(fecha)) formularioValido = false;
    if (!validarNumero(monto)) formularioValido = false;
    if (!validarNumero(impuesto)) formularioValido = false;
    if (!validarNumero(total)) formularioValido = false;
    if (!validarCampo(estado)) formularioValido = false;
    if (!validarCampo(metodoPago)) formularioValido = false;
    if (!validarCampo(usuario)) formularioValido = false;

    if (formularioValido) {
        alert('Datos ingresados correctamente, enviado al servidor...');
        const formulario = document.getElementById('registroFactura');
        const datosFormulario = new FormData(formulario);
        const data = Object.fromEntries(datosFormulario.entries());

        console.log("Datos enviados:", data);
        const enviarDatos = async () => {
            try {
                const respuesta = await fetch('http://localhost:3000/guardarFactura', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const info = await respuesta.json();
                console.log('Factura almacenada: ', info);

                if (respuesta.ok) {
                    console.log("Los datos de la factura se enviaron correctamente al servidor.");
                    formulario.reset();
                    limpiarValidaciones();
                    inicializarTablaFacturas();
                } else {
                    alert('Error al guardar la factura: ' + info.mensaje);
                }
            } catch (error) {
                console.log('Error al guardar la factura: ', error);
                alert('No se pudo guardar la factura. Revisa la consola.');
            }
        }
        enviarDatos();
    } else {
        alert('Complete todos los datos antes de enviar la factura.');
    }
}

// Validaciones específicas
function validarCampo(campo) {
    if (campo.value.trim() === '') {
        campo.classList.add('is-invalid', 'alerta');
        return false;
    } else {
        campo.classList.remove('is-invalid', 'alerta');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarNumero(campo) {
    if (campo.value === '' || isNaN(campo.value) || Number(campo.value) <= 0) {
        campo.classList.add('is-invalid', 'alerta');
        return false;
    } else {
        campo.classList.remove('is-invalid', 'alerta');
        campo.classList.add('is-valid');
        return true;
    }
}

function validarFecha(campo) {
    if (campo.value === '') {
        campo.classList.add('is-invalid', 'alerta');
        return false;
    } else {
        campo.classList.remove('is-invalid', 'alerta');
        campo.classList.add('is-valid');
        return true;
    }
}

// Cargar usuarios en el dropdown
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:3000/usuarios');
        const usuarios = await respuesta.json();

        const selectUsuarios = document.getElementById('selectUsuario');
        Object.entries(usuarios).forEach(([key, usuario]) => {
            const opcion = document.createElement('option');
            opcion.value = usuario._id;
            opcion.textContent = `${usuario.nombre} (${usuario.rut})`;
            selectUsuarios.appendChild(opcion);
        });
    } catch (error) {
        console.log('Error al cargar usuarios: ', error);
    }
}

// Cálculo automático de IVA y Total
document.addEventListener('DOMContentLoaded', () => {
    const inputMonto = document.getElementById('inputMonto');
    inputMonto.addEventListener('input', function() {
        let monto = Number(this.value);
        let impuesto = monto * 0.19;
        let total = monto + impuesto;

        document.getElementById('inputImpuesto').value = impuesto.toFixed(2);
        document.getElementById('inputTotal').value = total.toFixed(2);
    });
});