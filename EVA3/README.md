# Evaluación Unidad 3 - Búsqueda avanzada con MongoDB

Este proyecto corresponde a la **Evaluación N°3** de la asignatura, donde se implementa un sistema de registro y consulta de **Usuarios** y **Facturas**, utilizando **Node.js, Express y MongoDB con Mongoose**.  
Se incluyen validaciones, seguridad en contraseñas y relaciones entre colecciones mediante `$lookup`.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/Victormoncada24/Evaluaci-n-03---B-squeda-avanzada-con-MongoDB
cd Evaluaci-n-03---B-squeda-avanzada-con-MongoDB

<h1>Proceso de Creación de Backend + MongoDB</h1>

<ol>
    <li>Instalar la última versión de Node.JS</li>
    <li>Mediante el terminal, nos ubicamos en la carpeta donde se creará el servidor backend.</li>
    <li>Ejecutamos el comando: <code>npm init -y</code></li>
    <li>Posteriormente, ejecutamos el comando: <code>npm install express cors mongoose</code></li>
    <li>Si no se reconocen los comandos NPM luego de instalar NODE, probablemente VSCODE estaba abierto mientras se instaló NODE y debemos reiniciar VSCODE para que reconozca los cambios.</li>
    <li>Si el error es porque la ejecución de scripts está deshabilitada en el sistema, ejecutaremos el siguiente comando en el terminal: <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code></li>
    <li>Una vez ejecutado el script, deberíamos poder ejecutar los scripts NPM anteriores.</li>
</ol>

2. Instalar dependencias
Lo correcto es instalar las dependencias desde package.json:
bash
npm install

3. Iniciar servidor
bash
cd EVA3
cd backend
node servidor.js

El servidor se ejecutará en:
http://localhost:3000

Asegúrate de tener MongoDB corriendo en localhost:27017 y la base de datos eva3 disponible.

Esquema de Usuario

El objeto Usuario incluye los siguientes campos y validaciones:

nombre (String, obligatorio)
rut (String, obligatorio, validación de formato chileno con dígito verificador)
correo (String, obligatorio, validación de email)
telefono (String)
fechaNacimiento (Date, obligatorio, debe ser anterior a la fecha actual)
nacionalidad (String, código ISO-3166 Alpha-2, obligatorio)
genero (String, valores permitidos: M, F, O)
direccion (Object con comuna, calle, número y departamento, obligatorio)
contrasena (String, almacenada con bcrypt)
fechaRegistro (Date, asignada automáticamente)
activo (Boolean, por defecto true)

Esquema de Factura

El objeto Factura incluye los siguientes campos:

usuario (ObjectId, referencia a Usuario, obligatorio)
numero (String, obligatorio)
proveedor (String, obligatorio)
fecha (Date, obligatorio)
monto (Number, obligatorio)
impuesto (Number, obligatorio)
total (Number, obligatorio)
estado (String, valores: Pendiente, Pagada, Anulada)
metodoPago (String, valores: Efectivo, Transferencia, Tarjeta, Sin método de pago)
descripcion (String)
moneda (String, por defecto CLP)

Endpoints principales

Usuarios:

POST /guardarUsuario → Registra un nuevo usuario con validaciones y contraseña encriptada.
GET /usuarios → Devuelve usuarios activos (nombre y rut).
GET /usuariosConPais → Devuelve usuarios con nacionalidad y país de origen mediante $lookup.

Facturas:

POST /guardarFactura → Registra una nueva factura asociada a un usuario.
GET /facturas → Devuelve las facturas registradas junto con datos del usuario (nombre, rut, correo) mediante $lookup.

Vistas HTML

formulario.html → Registro de usuarios.
factura.html → Registro de facturas y visualización en tabla con DataTables.
inicio.html → Página inicial de navegación.

Las vistas permiten registrar y consultar datos de manera visual y ordenada.

Relación Usuario ↔ Factura

La relación entre Usuario y Factura es 1:N:

Un usuario puede tener cero o muchas facturas.
Cada factura pertenece a un único usuario.

Representación simple:

Usuario (1) ────< Factura (N)

Autor
Victor Aukan Moncada Tropa  
Proyecto de evaluación académica - Unidad 3