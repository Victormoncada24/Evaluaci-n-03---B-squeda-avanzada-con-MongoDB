<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>Evaluación Unidad 3 - Búsqueda avanzada con MongoDB</h1>

  <p>
    Este proyecto corresponde a la <strong>Evaluación N°3</strong> de la asignatura, donde se implementa un sistema de registro y consulta de 
    <strong>Usuarios</strong> y <strong>Facturas</strong>, utilizando <em>Node.js, Express y MongoDB con Mongoose</em>. 
    Se incluyen validaciones, seguridad en contraseñas y relaciones entre colecciones mediante <code>$lookup</code>.
  </p>

  <h2>Instalación y ejecución</h2>
  <ol>
    <li><strong>Clonar el repositorio:</strong>
      <pre><code>git clone https://github.com/Victormoncada24/Evaluaci-n-03---B-squeda-avanzada-con-MongoDB
cd Evaluaci-n-03---B-squeda-avanzada-con-MongoDB/EVA3</code></pre>
    </li>
    <li><strong>Instalar dependencias:</strong>  
      <p>Lo correcto es instalar las dependencias desde <code>package.json</code>:</p>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Iniciar servidor:</strong>
      <p>Primero nos movemos a la carpeta donde esta el script: servidor.js</p>
      <pre><code>cd EVA3</code></pre>
      <pre><code>cd backend</code></pre>    
      <pre><code>node servidor.js</code></pre>
      <p>El servidor se ejecutará en: <code>http://localhost:3000</code></p>
    </li>
  </ol>
  <p>Asegúrate de tener <strong>MongoDB corriendo en localhost:27017</strong> y la base de datos <code>eva3</code> disponible.</p>

  <h2>Esquema de Usuario</h2>
  <ul>
    <li>nombre (String, obligatorio)</li>
    <li>rut (String, obligatorio, validación chilena con dígito verificador)</li>
    <li>correo (String, obligatorio, validación de email)</li>
    <li>telefono (String)</li>
    <li>fechaNacimiento (Date, obligatorio, anterior a la fecha actual)</li>
    <li>nacionalidad (String, código ISO-3166 Alpha-2, obligatorio)</li>
    <li>genero (String, valores permitidos: M, F, O)</li>
    <li>direccion (Object con comuna, calle, número y departamento, obligatorio)</li>
    <li>contrasena (String, almacenada con <code>bcrypt</code>)</li>
    <li>fechaRegistro (Date, asignada automáticamente)</li>
    <li>activo (Boolean, por defecto true)</li>
  </ul>

  <h2>Esquema de Factura</h2>
  <ul>
    <li>usuario (ObjectId, referencia a Usuario, obligatorio)</li>
    <li>numero (String, obligatorio)</li>
    <li>proveedor (String, obligatorio)</li>
    <li>fecha (Date, obligatorio)</li>
    <li>monto (Number, obligatorio)</li>
    <li>impuesto (Number, obligatorio)</li>
    <li>total (Number, obligatorio)</li>
    <li>estado (String, valores: Pendiente, Pagada, Anulada)</li>
    <li>metodoPago (String, valores: Efectivo, Transferencia, Tarjeta, Sin método de pago)</li>
    <li>descripcion (String)</li>
    <li>moneda (String, por defecto CLP)</li>
  </ul>

  <h2>Endpoints principales</h2>
  <h3>Usuarios</h3>
  <ul>
    <li><code>POST /guardarUsuario</code> → Registra un nuevo usuario con validaciones y contraseña encriptada.</li>
    <li><code>GET /usuarios</code> → Devuelve usuarios activos (nombre y rut).</li>
    <li><code>GET /usuariosConPais</code> → Devuelve usuarios con nacionalidad y país de origen mediante <code>$lookup</code>.</li>
  </ul>

  <h3>Facturas</h3>
  <ul>
    <li><code>POST /guardarFactura</code> → Registra una nueva factura asociada a un usuario.</li>
    <li><code>GET /facturas</code> → Devuelve las facturas registradas junto con datos del usuario (nombre, rut, correo) mediante <code>$lookup</code>.</li>
  </ul>

  <h2>Vistas HTML</h2>
  <ul>
    <li><strong>formulario.html</strong> → Registro de usuarios.</li>
    <li><strong>factura.html</strong> → Registro de facturas y visualización en tabla con DataTables.</li>
    <li><strong>inicio.html</strong> → Página inicial de navegación.</li>
  </ul>
  <p>Las vistas permiten registrar y consultar datos de manera visual y ordenada.</p>

  <h2>Relación Usuario ↔ Factura</h2>
  <p>La relación entre Usuario y Factura es <strong>1:N</strong>:</p>
  <ul>
    <li>Un usuario puede tener cero o muchas facturas.</li>
    <li>Cada factura pertenece a un único usuario.</li>
  </ul>
  <pre><code>Usuario (1) ────< Factura (N)</code></pre>

  <h2>Autor</h2>
  <p><strong>Victor Aukan Moncada Tropa</strong><br>
  Proyecto de evaluación académica - Unidad 3</p>
</body>
</html>