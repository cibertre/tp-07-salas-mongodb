# Trabajo práctico 07 - Salas - MongoDB

## Descripción

En este trabajo práctico continué con la aplicación de reservas de salas que había realizado en el TP06. En esta oportunidad agregué una parte para trabajar con MongoDB y guardar reservas en una base de datos.

La aplicación web sigue funcionando como en el trabajo anterior. También agregué scripts que permiten comprobar la conexión con MongoDB, validar los datos de una reserva, crear reservas y consultar las que están guardadas.

El objetivo fue comenzar a trabajar con una base de datos sin modificar el funcionamiento de la aplicación web que ya tenía realizada.

## Tecnologías utilizadas

Para realizar el trabajo utilicé:

- Node.js v22.16.0
- Express
- EJS
- Express EJS Layouts
- MongoDB Atlas
- Mongoose
- Morgan
- ESLint
- Prettier

## Instalación

Para ejecutar el proyecto, primero hay que descargarlo o clonarlo desde el repositorio y abrir una terminal dentro de la carpeta del proyecto.

Después se instalan las dependencias con el siguiente comando:

```bash
npm install
```

También hay que configurar el archivo `.env` con los datos necesarios para conectarse con MongoDB.

Este archivo contiene información privada, por eso está excluido del repositorio y no debe subirse con las credenciales reales.

## Configuración de MongoDB

Para este trabajo utilicé MongoDB Atlas.

La base de datos se llama `reservas_salas_u7` y la colección utilizada es `reservas`. En esa colección se guardan los documentos correspondientes a las reservas creadas mediante los scripts del trabajo práctico.

La conexión se configura mediante la variable `MONGODB_URI`, que se encuentra en el archivo `.env`.

Para conectarse correctamente, hay que tener configurado el usuario de la base de datos y los permisos de acceso correspondientes en MongoDB Atlas.

También utilicé MongoDB Compass para ingresar al clúster, consultar la base de datos y comprobar que los documentos estuvieran guardados.

## Dependencias

Las dependencias utilizadas en el proyecto son las siguientes.

**Dependencias principales:**

- `ejs`: permite generar las páginas que se muestran en el navegador.
- `express`: se utiliza para crear el servidor y manejar las rutas.
- `express-ejs-layouts`: permite utilizar una estructura común para las vistas.
- `mongoose`: permite conectarse con MongoDB y trabajar con los documentos.
- `morgan`: muestra información de las solicitudes que recibe el servidor.

**Dependencias de desarrollo:**

- `@eslint/js` y `eslint`: ayudan a revisar el código y encontrar posibles errores.
- `prettier`: permite mantener un formato ordenado en los archivos.

## Organización del proyecto

El proyecto está organizado en carpetas para separar las distintas partes de la aplicación.

- `src/config`: contiene la configuración del entorno y la conexión con la base de datos.
- `src/modelos`: contiene el modelo de las reservas.
- `src/servicios`: contiene la lógica relacionada con las reservas de la aplicación web.
- `src/controladores`: contiene el código que procesa las solicitudes.
- `src/rutas`: contiene las rutas de la aplicación.
- `src/middlewares`: contiene los middlewares utilizados por la aplicación.
- `views`: contiene las vistas realizadas con EJS.
- `public`: contiene los archivos públicos, como los estilos.
- `scripts`: contiene los archivos que se ejecutan desde la terminal para trabajar con MongoDB.

## Modelo de reserva

El modelo se creó con Mongoose y define los campos que debe tener una reserva.

|      Campo   |  Tipo  |            Descripción            |
|--------------|--------|-----------------------------------|
| `estudiante` | String |      Nombre del estudiante        |
|    `email`   | String | Correo electrónico del estudiante |
|    `sala`    | String |     Sala que se desea reservar    |
|   `fecha`    | String |           Fecha de la reserva     |
|   `turno`    | String |             Turno elegido         |
|   `personas` | Number |          Cantidad de personas     |

El modelo incluye validaciones para controlar los datos antes de guardarlos.

- El nombre, el correo, la sala, la fecha y el turno son obligatorios.
- El nombre, el correo y la fecha eliminan los espacios al principio y al final.
- El correo debe contener el símbolo `@`.
- Las salas permitidas son Sala Norte, Sala Sur y Sala Multimedia.
- Los turnos permitidos son Mañana, Tarde y Noche.
- La cantidad de personas debe ser un número entero entre 1 y 6.

MongoDB genera automáticamente el identificador `_id` de cada documento.

## Scripts para trabajar con MongoDB

Agregué los siguientes comandos en el archivo `package.json` para ejecutar las pruebas desde la terminal.

|          Comando      |                                Función                            |
|-----------------------|-------------------------------------------------------------------|
| `npm run comprobardb` |           Comprueba la conexión con MongoDB.                      |
|     `npm run validar` | Comprueba si los datos de una reserva son válidos, sin guardarla. |
|       `npm run crear` |              Crea una reserva en la base de datos.                |
|      `npm run listar` |             Muestra las reservas guardadas en la colección.       |

Estos comandos ejecutan los siguientes archivos:

- `scripts/comprobar-conexion.js`
- `scripts/validar-reserva.js`
- `scripts/crear-reserva.js`
- `scripts/listar-reserva.js`

Los scripts utilizan la configuración del archivo `.env` para conectarse a la base de datos.

## Matriz de pruebas

Realicé pruebas para comprobar la conexión con MongoDB, la validación de los datos, la creación de reservas, la consulta de documentos y la persistencia de la información.

En la siguiente tabla se muestran los resultados obtenidos.

| N.º | Prueba | Resultado esperado | Resultado obtenido | Estado |
|---:|---|---|---|---|
| 1  | Conexión con MongoDB | Establecer la conexión | La terminal mostró `Conexión con MongoDB establecida` | Aprobada |
| 2  | Validación de una reserva válida | Validar los datos sin guardar la reserva | La terminal mostró que los datos son válidos y que todavía no se guardaron | Aprobada |
| 3  | Crear una reserva | Guardar la reserva y mostrar su identificador | Se guardó una reserva y se mostró el `_id` `6acf5b296d22947acbff2307` | Aprobada |
| 4  | Listar las reservas | Mostrar los documentos guardados | Se mostraron dos reservas y el total fue 2 | Aprobada |
| 5  | Persistencia de los datos | Mantener los documentos al terminar el proceso | Después de cerrar la aplicación y ejecutar nuevamente el listado, aparecieron las mismas dos reservas | Aprobada |
| 6  | Comprobar los documentos en MongoDB Compass | Ver los documentos en la base y colección correctas | Se encontraron dos documentos en `reservas_salas_u7`, colección `reservas` | Aprobada |
| 7  | Formato del código | Comprobar que los archivos tengan el formato correcto | Prettier mostró `All matched files use Prettier code style!` | Aprobada |
| 8  | Revisión con ESLint | Revisar el código sin errores reportados | ESLint se ejecutó y no mostró errores en la salida compartida | Aprobada |
| 9  | Inicio de la aplicación web | Iniciar el servidor correctamente | La terminal mostró `Aplicación disponible en http://localhost:3000` | Aprobada |
| 10 | Funcionamiento de la aplicación web | Mantener el funcionamiento del TP06 | La aplicación mostró las cuatro reservas iniciales y permitió crear nuevas reservas | Aprobada |
| 11 | Reservas web en memoria | Comprobar que las reservas del formulario no persistan al reiniciar | La reserva creada desde el formulario desapareció al reiniciar la aplicación | Aprobada |
| 12 | Estudiante vacío | Rechazar una reserva sin estudiante | Falta comprobar individualmente | Pendiente |
| 13 | Correo inválido | Rechazar un correo que no cumpla la validación | Falta comprobar individualmente | Pendiente |
| 14 | Sala no permitida | Rechazar una sala que no esté en la lista permitida | Falta comprobar individualmente | Pendiente |
| 15 | Turno no permitido | Rechazar un turno que no esté permitido | Falta comprobar individualmente | Pendiente |
| 16 | Fecha vacía | Rechazar una reserva sin fecha | Falta comprobar individualmente | Pendiente |
| 17 | Personas igual a 0 | Rechazar una cantidad inferior al mínimo | Falta comprobar individualmente | Pendiente |
| 18 | Personas igual a 7 | Rechazar una cantidad superior al máximo | Falta comprobar individualmente | Pendiente |
| 19 | Personas igual a 2.5 | Rechazar una cantidad que no sea entera | Falta comprobar individualmente | Pendiente |
| 20 | Personas con texto | Rechazar un valor que no sea numérico | Falta comprobar individualmente | Pendiente |

### Observaciones de las pruebas

La conexión con MongoDB funcionó correctamente. También pude crear reservas mediante los scripts y consultar los documentos almacenados.

La persistencia se comprobó ejecutando nuevamente el listado después de cerrar la aplicación y revisando los documentos desde MongoDB Compass. Las dos reservas continuaron guardadas en la base de datos.

Por otro lado, comprobé que la aplicación web sigue trabajando con las reservas que tiene cargadas en memoria. Las cuatro reservas iniciales continúan apareciendo y las nuevas reservas creadas desde el formulario se pierden al reiniciar el servidor.

Las pruebas de datos inválidos que aparecen como pendientes deben ejecutarse individualmente antes de presentar la matriz como completamente terminada.

## Formato y revisión del código

Para corregir el formato de los archivos utilicé el comando:

```bash
npm run format
```

Después ejecuté:

```bash
npm run check
```

Este último comando comprueba el formato con Prettier y luego revisa el código con ESLint.

La terminal mostró el mensaje `All matched files use Prettier code style!`, indicando que los archivos revisados cumplen con el formato esperado.

Luego se ejecutó ESLint sin que aparecieran errores en la salida obtenida.

## Ejecución de la aplicación web

La aplicación web se inicia con el siguiente comando:

```bash
npm start
```

Una vez iniciado el servidor, se puede abrir el navegador y acceder a:

`http://localhost:3000`

Las rutas principales de la aplicación son:

- `/`: página de inicio.
- `/estado`: permite consultar el estado de la aplicación.
- `/reservas`: muestra las reservas.
- `/reservas/nueva`: presenta el formulario para crear una reserva.
- `/reservas/:id`: muestra el detalle de una reserva.
- `/api/reservas`: permite consultar las reservas mediante la API.

La aplicación web mantiene su funcionamiento anterior, mientras que los scripts permiten trabajar con los documentos guardados en MongoDB.

## Diferencia entre las reservas en memoria y MongoDB

Una diferencia importante es que las reservas de la aplicación web se guardan en memoria. Por eso, se pierden al reiniciar el servidor.

En cambio, las reservas creadas mediante los scripts se guardan en MongoDB y permanecen en la base de datos aunque termine el proceso de Node.js.

En este trabajo ambas partes se mantienen separadas. El objetivo es comenzar a trabajar con persistencia en MongoDB sin modificar el funcionamiento de la aplicación realizada en el TP06.

## Seguridad

El archivo `.env` está excluido del repositorio porque contiene la configuración privada de la conexión con MongoDB.

De esta manera se evita publicar la contraseña y otros datos de acceso. Si otra persona necesita ejecutar el proyecto, debe configurar sus propias credenciales.

También se debe incluir un archivo `.env.example` con valores de ejemplo, sin contraseñas reales, para indicar qué variables necesita configurar el proyecto.

## Conclusión

Con este trabajo pude practicar la conexión de Node.js con MongoDB utilizando Mongoose, crear un modelo con validaciones y guardar y consultar documentos desde scripts.

También pude comprobar la diferencia entre trabajar con datos en memoria y utilizar una base de datos para conservar la información.

Por último, revisé el formato y el código del proyecto con Prettier y ESLint, y comprobé que la aplicación web sigue funcionando como en el trabajo anterior.
