window.onload = function () {
    obtenerUsuarios();
};

async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:3000/usuariosConPais');
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
                { 
                    data: 'direccion',
                    render: function(data) {
                        if (!data || data.length === 0) return '';
                        const d = data[0]; // porque dirección es un array
                        return `${d.comuna}, ${d.calle} ${d.numero || ''} ${d.departamento || ''}`;
                    }
                },
            ]
    }); 
    } catch (error) {
        console.log('Error: ', error);
    }
};