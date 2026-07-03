window.onload = function () {
    obtenerUsuarios();
};

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:3000/usuarios');
        const usuarios = await respuesta.json();

        console.log(usuarios);

        new DataTable('#tablaUsuarios',{
            data: usuarios,
            columns:[
                {data: 'nombre'},
                {data: 'correo'},
                {data: 'rut'},
                {data: 'telefono'},
                {data: 'fechaNacimiento'},
                {data: 'genero'},
                {data: 'nacionalidad'},
                {data: 'fechaRegistro'},
                {data: 'activo'},
                {data: 'direccion'},
            ]
    }); 
    } catch (error) {
        console.log('Error: ', error);
    }
};