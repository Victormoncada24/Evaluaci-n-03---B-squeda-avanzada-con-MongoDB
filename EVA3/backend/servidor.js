// Importamos las librerías instaladas
const express = require('express'); // Express permite generar la aplicación backend
const cors = require('cors'); // Cors permite que el servidor reciba solicitudes externas
const mongoose = require('mongoose'); // ORM que permite trabajar con objetos y DBs
const bcrypt = require('bcrypt');

// Iniciar la aplicación express
const aplicacion = express();
const puerto = 3000;

// Instanciar las clases necesarias en nuestra aplicación
aplicacion.use(cors());
aplicacion.use(express.json());

// Crear la conexión a DB
mongoose.connect('mongodb://localhost:27017/eva3')
    .then(() => console.log('Conexión Exitosa!'))
    .catch((excepcion) => console.log('No ha sido posible conectarse por el siguiente error: ', excepcion));

const port = process.env.port || 3000;
aplicacion.listen(puerto, () => console.log(`Corriendo en el puerto ${port}`))

const comuna = new mongoose.Schema({
    codigo: String,
    nombre: String,
    region: String
});
// Crear un OBJETO en base al MODELO comuna
const Comuna = mongoose.model('Comuna', comuna, 'comunas');

const direccion = new mongoose.Schema({
    comuna: String,
    calle: String,
    numero: String,
    departamento: String
});

// Crear el MODELO de datos
const usuario = new mongoose.Schema({
    nombre: String,
    correo: String,
    rut: String,
    telefono: String,
    contrasena: String,
    fechaNacimiento: Date,
    genero: String,
    nacionalidad: String,
    fechaRegistro: { type: Date, default: Date.now },   // se asigna automáticamente
    activo: { type: Boolean, default: true },            // por defecto habilitado
    direccion: [direccion]
});
// Crear un OBJETO en base al MODELO usuario
const Usuario = mongoose.model('Usuario', usuario, 'usuarios');

const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});
// Crear un OBJETO en base al MODELO usuario
const Pais = mongoose.model('Pais', pais, 'paises');

// Crear el MODELO de datos Factura
const factura = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // relación con Usuario
    numero: String,
    proveedor: String,
    fecha: Date,
    monto: Number,
    impuesto: Number,
    total: Number,
    estado: { type: String, enum: ['Pendiente', 'Pagada', 'Anulada'], default: 'Pendiente' },
    metodoPago: { type: String, enum: ['Efectivo', 'Transferencia', 'Tarjeta'], required: true },
    descripcion: String,
    moneda: { type: String, default: 'CLP' }
});

// Crear un OBJETO en base al MODELO factura
const Factura = mongoose.model('Factura', factura, 'facturas');


// Crear el método para CREAR esos objetos en DB
aplicacion.post('/guardarUsuario', async (request, response) => {
    try {
        const { nombre, correo, rut, telefono, contrasena, fechaNacimiento, genero, nacionalidad, direccion } = request.body;

        const saltRounds = 10;
        const contrasenaEncriptada = await bcrypt.hash(contrasena, saltRounds);

        const jsonDireccion = JSON.parse(direccion);

        const nuevoUsuario = new Usuario({ nombre, correo, rut, telefono, contrasena: contrasenaEncriptada, fechaNacimiento, genero, nacionalidad, direccion: jsonDireccion });

        await nuevoUsuario.save();
        response.status(200).json({ mensaje: 'Datos almacenados correctamente.' });
    } catch (excepcion) {
        response.status(500).json({ mensaje: 'No se han podido almacenar los datos: ', excepcion });
    }
});

// Crear el método para CREAR facturas en DB
aplicacion.post('/guardarFactura', async (request, response) => {
    try {
        const { usuario, numero, proveedor, fecha, monto, impuesto, total, estado, metodoPago, descripcion, moneda } = request.body;

        // Crear un nuevo objeto Factura en base al modelo
        const nuevaFactura = new Factura({
            usuario,        // aquí llega el _id del usuario desde el dropdown
            numero,
            proveedor,
            fecha,
            monto,
            impuesto,
            total,
            estado,
            metodoPago,
            descripcion,
            moneda
        });

        // Guardar en la colección facturas
        await nuevaFactura.save();

        response.status(200).json({ mensaje: 'Factura almacenada correctamente.' });
    } catch (error) {
        response.status(500).json({ mensaje: 'No se han podido almacenar los datos: ', error });
    }
});

// Crear método para obtener objetos desde la DB
aplicacion.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await Usuario.aggregate([{ // Colección original que queremos consultar
            $lookup:{
                from:'paises', // Colección desde la que quiero agregar datos
                localField:'nacionalidad', // Campo que relaciona la data de la coleccion agregada en la coleccion consultada
                foreignField:'iso2', // Campo de la tabla agregada que tiene la informacion relacionada
                as: 'paisOrigen' // Nombre dinámico que le daremos al objeto nuevo
            }
        }]);

        if (!usuarios || usuarios.length === 0) {
            return response.status(404).json({ mensaje: 'No se encontraron usuarios registrados.' });
        }

        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json({ mensaje: 'No ha sido posible obtener los datos: ', error })
    }
});

// “Usé $unwind para simplificar el objeto usuario y $project para devolver solo los campos relevantes,
// así la tabla muestra directamente nombre y rut sin arrays ni datos innecesarios.”
aplicacion.get('/facturas', async (request, response) => {
    try {
        const facturas = await Factura.aggregate([
            {
                $lookup: {
                    from: 'usuarios',              // nombre de la colección relacionada
                    localField: 'usuario',         // campo en Factura
                    foreignField: '_id',           // campo en Usuario
                    as: 'usuario'                  // alias para los datos unidos
                }
            },
            { $unwind: '$usuario' },              // convierte el array en objeto
            {
                $project: {                       // selecciona los campos que quieres mostrar
                    numero: 1,
                    proveedor: 1,
                    fecha: 1,
                    monto: 1,
                    impuesto: 1,
                    total: 1,
                    estado: 1,
                    metodoPago: 1,
                    descripcion: 1,
                    moneda: 1,
                    'usuario.nombre': 1,
                    'usuario.rut': 1,
                    'usuario.correo': 1
                }
            }
        ]);

        response.status(200).json(facturas);
    } catch (error) {
        response.status(500).json({ mensaje: 'Error al obtener facturas', error });
    }
});

aplicacion.get('/paises', async (request, response) => {
    try {
        const paises = await Pais.find().exec();
        if (!paises || paises.length === 0) {
            return response.status(404).json({ mensaje: 'No se encontraron países registrados.' });
        }

        response.status(200).json(paises);
    } catch (error) {
        response.status(500).json({ mensaje: 'No ha sido posible obtener los datos: ', error })
    }
});

aplicacion.get('/comunas', async (request, response) => {
    try {
        const comunas = await Comuna.find().exec();
        if (!comunas || comunas.length === 0) {
            return response.status(404).json({ mensaje: 'No se encontraron comunas registradas.' });
        }

        response.status(200).json(comunas);
    } catch (error) {
        response.status(500).json({ mensaje: 'No ha sido posible obtener los datos: ', error })
    }
});

// Endpoint /usuarios
aplicacion.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await Usuario.find({ activo: true }).select('nombre rut');
        response.status(200).json(usuarios);
    } catch (error) {
        response.status(500).json({ mensaje: 'Error al obtener usuarios', error });
    }
});