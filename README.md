# Trabajo práctico 07 - Salas - MongoDB

## Descripción

Este trabajo práctico es una continuación del TP 06, donde hice una aplicación para consultar salas de estudio y registrar reservas.

En esta nueva versión agregué MongoDB y Mongoose para empezar a guardar las reservas en una base de datos y poder consultarlas después.

La aplicación web sigue funcionando como en el trabajo anterior. Las reservas que se crean desde el formulario se guardan en memoria, mientras que las reservas de MongoDB se crean y se consultan desde programas que se ejecutan en la terminal.

## Tecnologías utilizadas

- Node.js
- Express
- EJS
- MongoDB Atlas Free (M0)
- Mongoose
- Morgan
- ESLint
- Prettier

Para realizar el trabajo utilicé Node.js, npm y las dependencias instaladas en el proyecto. Las versiones exactas se pueden consultar con los comandos que aparecen más abajo.

## Instalación

Primero hay que descargar o clonar el repositorio y abrir una terminal en la carpeta del proyecto.

Instalar las dependencias con:

```bash
npm install
```

Después hay que configurar las variables de entorno para poder conectar con MongoDB Atlas.

## Configuración de MongoDB Atlas

Para este trabajo utilicé MongoDB Atlas con un clúster gratuito Free (M0).

Los pasos para preparar la conexión son:

1. Crear un clúster gratuito en MongoDB Atlas.
2. Crear un usuario de base de datos con permisos de lectura y escritura.
3. Configurar la dirección IP desde la cual se va a conectar la aplicación.
4. Obtener la URI de conexión desde Atlas.
5. Copiar el archivo `.env.example` y crear un archivo llamado `.env`.
6. Reemplazar los datos de ejemplo por los datos reales de la conexión.

El archivo `.env` contiene las variables necesarias para ejecutar el proyecto. La variable `MONGODB_URI` guarda la dirección de conexión a MongoDB.

La base de datos utilizada para este trabajo es `reservas_salas_u7` y la colección se llama `reservas`.

Por seguridad, el archivo `.env` no se debe subir a GitHub, porque contiene datos privados. En cambio, se incluye `.env.example` como ejemplo de las variables necesarias, sin credenciales reales.

## Organización de los archivos

Los archivos principales del proyecto están organizados de la siguiente manera:

- `src/index.js`: inicia la aplicación y contiene las reservas iniciales que utiliza el sitio web.
- `src/app.js`: configura Express, las vistas, los recursos públicos y las rutas principales.
- `src/config/entorno.js`: lee y valida la configuración del entorno y la URI de MongoDB.
- `src/config/base-datos.js`: contiene las funciones para conectar y desconectar MongoDB. También configura los servidores DNS utilizados en la conexión.
- `src/modelos/reservas.js`: define el modelo `Reserva` y las reglas de validación de los datos.
- `src/servicios/serviceReserva.js`: administra las reservas que se guardan en memoria.
- `src/controladores/controlReserva.js`: recibe las solicitudes y decide qué vista mostrar o a qué dirección redirigir.
- `src/rutas/rutasReserva.js`: define las rutas relacionadas con las reservas.
- `src/middlewares/`: contiene los middlewares utilizados por la aplicación.
- `src/views/`: contiene las vistas EJS.
- `public/`: contiene los archivos públicos, como los estilos y las imágenes.
- `scripts/comprobar-conexion.js`: prueba la conexión con MongoDB.
- `scripts/validar-reserva.js`: comprueba si una reserva cumple las reglas del modelo sin guardarla.
- `scripts/crear-reserva.js`: crea una reserva en MongoDB.
- `scripts/listar-reservas.js`: consulta las reservas guardadas y muestra el resultado en la terminal.

## Modelo Reserva

Para trabajar con las reservas creé un modelo llamado `Reserva` utilizando Mongoose. El modelo está asociado a la colección `reservas`.

Los campos utilizados son:

| Campo | Tipo | Validación |
|---|---|---|
| estudiante | String | Es obligatorio y elimina espacios al principio y al final. |
| email | String | Es obligatorio y debe contener el carácter `@`. |
| sala | String | Solo permite Sala Norte, Sala Sur o Sala Multimedia. |
| fecha | String | Es obligatoria y elimina espacios al principio y al final. |
| turno | String | Solo permite Mañana, Tarde o Noche. |
| personas | Number | Es obligatorio, debe ser entero y estar entre 1 y 6. |

Estas validaciones sirven para evitar que se guarden reservas con datos que no cumplen las condiciones indicadas.

De todas maneras, todavía no se comprueba que el correo sea completamente válido ni que la fecha exista realmente en el calendario. Tampoco se controlan los turnos repetidos o los cruces de reservas.

## Programas de MongoDB

Para ejecutar los programas de prueba se utiliza la terminal, desde la carpeta principal del proyecto.

### Comprobar la conexión

```bash
npm run comprobardb
```

Este comando intenta conectarse a MongoDB Atlas. Si la conexión funciona, muestra un mensaje de confirmación y termina. Si falla, muestra información del error sin publicar la URI privada.

### Validar una reserva

```bash
npm run validar
```

Este programa comprueba una reserva de ejemplo utilizando las validaciones del modelo. No guarda ningún documento en la base de datos.

### Crear una reserva

```bash
npm run crear
```

Este programa crea una reserva de ejemplo en MongoDB y muestra el identificador `_id` que devuelve la base de datos.

Si se ejecuta más de una vez, se pueden guardar varias reservas con datos iguales, pero con identificadores diferentes.

### Listar las reservas

```bash
npm run listar
```

Este programa consulta las reservas guardadas en MongoDB, muestra sus datos en la terminal y presenta la cantidad de documentos encontrados.

La consulta no crea ni elimina registros. Si la colección está vacía, debe informar que hay cero reservas.

## Pruebas realizadas

Para comprobar el funcionamiento del trabajo realicé pruebas de conexión, creación, consulta y validación de los datos.

También probé los siguientes casos:

- Conexión correcta con MongoDB.
- Creación de una reserva válida.
- Consulta de las reservas desde otro proceso de Node.js.
- Comprobación de que el mismo `_id` sigue apareciendo después de terminar y volver a ejecutar los programas.
- Verificación de que una segunda consulta no agrega registros.
- Rechazo de un estudiante vacío.
- Rechazo de un correo sin `@`.
- Rechazo de una sala o un turno que no están permitidos.
- Rechazo de una fecha vacía.
- Rechazo de cantidades de personas fuera del rango permitido o que no son enteras.
- Rechazo de un valor de personas que no se puede convertir a número.
- Comprobación del funcionamiento de la aplicación web y sus rutas.

Los resultados y las capturas de las pruebas se deben presentar junto con esta documentación para mostrar lo que se comprobó durante la ejecución.

## Comandos de calidad

Para ordenar el formato de los archivos utilizo:

```bash
npm run format
```

Para comprobar el formato y revisar posibles errores de código utilizo:

```bash
npm run check
```

Este último comando ejecuta Prettier en modo de comprobación y ESLint sobre los archivos de `src` y `scripts`.

## Ejecutar la aplicación web

Para iniciar la aplicación utilizo:

```bash
npm start
```

La aplicación se ejecuta en el puerto 3000, salvo que se configure otro puerto mediante la variable `PORT`.

Las rutas principales son:

- `/`: muestra la página de inicio.
- `/estado`: devuelve información sobre la cantidad de reservas y el identificador de la solicitud.
- `/reservas`: muestra el listado de reservas.
- `/reservas/nueva`: muestra el formulario para crear una reserva.
- `/reservas/:id`: muestra el detalle de una reserva.
- `/api/reservas`: devuelve las reservas en formato JSON.

También se comprueba el funcionamiento de los formularios, las redirecciones, los errores de validación y las páginas no encontradas.

## Diferencia entre memoria y MongoDB

En este trabajo las reservas del sitio web siguen guardándose en un arreglo de JavaScript que está en memoria. Por eso, las reservas creadas desde el formulario no permanecen cuando se reinicia el servidor.

En cambio, los programas de terminal utilizan Mongoose para guardar y consultar las reservas en MongoDB Atlas. Los documentos que se guardan de esta manera permanecen en la base de datos aunque termine el programa.

Por ahora, las dos partes funcionan por separado. En esta etapa no se pidió modificar el servicio ni los controladores de Express para trabajar directamente con MongoDB. Esa integración se podrá realizar más adelante, cuando se avance con los temas de la unidad 8.

## Conclusión

Con este trabajo pude empezar a utilizar MongoDB Atlas y Mongoose para guardar y recuperar datos desde Node.js.

También pude practicar la creación de modelos, las validaciones, la conexión con una base de datos y las consultas desde programas independientes.

La aplicación web conserva el funcionamiento del TP 06, mientras que los nuevos programas permiten comprobar la persistencia de las reservas en MongoDB.
