# Evaluaci-n-03---B-squeda-avanzada-con-MongoDB
Búsqueda avanzada con MongoDB. Organiza comandos para conformar rutinas de búsqueda en documentos, subdocumentos y arreglos, considerando una problemática planteada y requerimientos de seguridad, cumpliendo con las normas, procedimientos y protocolos establecidos
Teniendo en consideración esta información, para su evaluación N°3, Ud. deberá modificar el proyecto
que se ha construído conjuntamente en clases y agregar los campos faltantes a su objeto USUARIO, de
acuerdo a las indicaciones entregadas en estas instrucciones. Junto con esto, deberá relacionarlo con la
entidad correspondiente, que le fue asignada por sistema en la presente evaluación.
Su objeto USUARIO deberá quedar modificado de acuerdo al siguiente esquema:
Campo
Tipo de
Dato Descripción
nombre String Nombre completo del usuario, obligatorio.
rut String RUT chileno con dígito verificador, obligatorio.
correo String Correo electrónico del usuario, obligatorio.
telefono String Número telefónico de contacto del usuario.
fechaNacimiento Date Fecha de nacimiento del usuario. Debe corresponder a una fecha
válida y anterior a la fecha actual.
nacionalidad String Código ISO-3166 Alpha-2 del país de nacionalidad (por ejemplo: CL,
AR, PE), obligatorio.
genero String Género del usuario. Valores permitidos: M, F u O.
direccion Object Objeto que almacena la dirección del usuario (comuna, calle,
número y departamento/oficina), obligatorio.
contrasena String Contraseña almacenada mediante algoritmo hash de bcrypt.
Obligatorio.
fechaRegistro Date Fecha y hora en que el usuario fue registrado. Debe asignarse
automáticamente al momento de la creación del documento.
activo Boolean Indica si el usuario se encuentra habilitado en el sistema. Valor
predeterminado: true.
Los métodos y vistas html ya construidas del objeto USUARIO deberán mdificarse para que puedan
persistir y consultar los datos de acuerdo al nuevo esquema, incluyendo la validaciones indicadas.
Su objeto USUARIO deberá ascociarse a la entidad que le fue asignada por sistema, para lo que deberá:
1. Crear la nueva colección en su base de datos.
2. Crear el mongoose.Schema del nuevo objeto.
3. Crear el nuevo modelo mongoose.Model basado en el schema creado, asociando la colección
correspondiente.
4. Crear el método POST para persistir el objeto en la colección correspondiente.
5. Crear el método GET para consultar el objeto en la colección correspondiente.
6. En su método GET recuerde crear la agregación ($lookup) necesaria para traer los datos del usuario
junto con los de su objeto.
7. Crear un vista html para mostrar una tabla con los datos de sus objetos, incluyendo alguna
información del usuario, como Nombre o Rut que permita asociarlos visualmente.
La entrega de su evaluación deberá ser mediante un repositorio de GitHub, el que deberá ser
compartido con su profesor a través de la plataforma (url del repositorio). El repositorio deberá contener
el código fuente de su proyecto, incluyendo los archivos modificados y creados para cumplir con los
requerimientos de la evaluación. Asegúrese de que el repositorio esté creado como público.
Recuerde que tendrá tiempo suficiente para resolver su evaluación, pero los intentos para subirla no son
ilimitados, por lo que le recomiendo abrirla una vez para obtener toda la información necesaria y luego
abrirla para enviar el resultado de su trabajo.
