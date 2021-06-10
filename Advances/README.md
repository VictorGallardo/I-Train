# Diario de trabajo :notebook:

Diario de trabajo **Proyecto Fin de Ciclo**, en el se anotarán los avances producidos y será actualizado semanalmente.
<br>
<br>

## :calendar: Semana **1** ( 12/04 - 18/04 )

-   Inicio de proyecto - **Backend Server** ( itrain server ).

    -   Clase Server - Instancia de express.
    -   Modelos para la base de datos ( usuarios y publicaciones )
    -   Crear usuario y actualizar usuarios.
    -   Servicios para el login y subida de archivos.
    -   Encriptado de contraseñas.
    -   Creacion y verificación de JsonWebTokens.

*   Inicio de proyecto - **Ionic App** ( itrain app ).

    -   Interfaces.
    -   Crear registros en la base de datos.
    -   Obtener listados.
    -   Backend COORS.
    -   Creación de componentes, páginas...
    -   Servicios usuarios, registros y token.
    -   Servicio para centralizar _alerts_ y _toast_.
    -   Almacenamiento del token mediante **Capacitor Storage**.
    -   Diseño de Login y registro.
    -   Login y registro de usuarios.
    -   Actualizar datos del usuario.
    -   Protección de rutas mediante Guards.
    -   Diseño de páginas crear un registros y main.

## :calendar: Semana **2** ( 19/04 - 25/04 )

-   Proyecto **Backend Server**

    -   Creación de esquema, modelo y ruta para ejercicios (items).
    -   Método GET para obtener los ejercicios creados.

-   Proyecto **Ionic app**.

    -   Implementación de la cámara ( métodos para tomar o añadir fotos ).
    -   Pipe con ruta.
    -   Mostrar imágenes.
    -   Logout de la sesión de usuario.
    -   Diseño página de ejercicios ( lista con los items ).
    -   Diseño pagina de listas donde van los items.
    -   Diseño página de crear o editar listas y items.
    -   Componentes para mostrar listas.

## :calendar: Semana **3** ( 26/04 - 02/05 )

-   Proyecto **Backend Server**

    -   Métodos DELETE para eliminar items y listas.
    -   Método DELETE para eliminar todos los items de una lista.
    -   Métodos POST para editar items y listas.

-   Proyecto **Ionic app**.

    -   Diseño y lógica del Timer ( Esto me ha ocupado casi toda la semana ).
    -   Eliminar y editar listas.
    -   Eliminar y editar items.

## :calendar: Semana **4** ( 03/05 - 09/05 )

-   Proyecto **Ionic app**.

    -   Diseño e implementación del calendario.
    -   Retoques en el diseño y ajustes de lógica.

-   Proyecto **Angular app**.

    _Aplicación en angular, creada con angular material, esta app se comunica con la api para poder administrar los usuarios, listas..._

    -   Creación del proyecto de administración en angular.
    -   Creación del esquema de la app, rutas, servicios, componentes, páginas...
    -   Diseño de los componentes y páginas ( sidebar, dashboard, nav... ).
    -   Diseño y lógica del login.
    -   Función para recordar el usuario (esto solo lo hace con el email, este se almacena en el localStorage).
    -   Almacenamiento del token en las **cookies**.
    -   Proteccion de las rutas mediante **guards**.
    -   Implementacion de la tabla usuarios, paginación y filtro.

-   Proyecto **Backend Server**

    **Ionic app**

    -   Creación de esquema y modelo ( eventos del calendario ) de la base de datos (**Mongoose y express**).
    -   Métodos **GET** y **POST** para los eventos del calendario.

    **Angular app**

    -   Métodos **GET** para obtener todos los usuarios, listas e items.

## :calendar: Semana **5** ( 10/05 - 16/05 )

-   Proyecto **Ionic app**.

    -   Retoques en el diseño y ajustes de lógica.
    -   Corrección en ifinite-scroll.
    -   Corrección en item list.

-   Proyecto **Angular app**.

    -   Retoques en el diseño.

-   Proyecto **Backend Server**

    -   Preparando la API para producción.
    -   Corrección en la paginación.

#### Cambios importantes.

-   Subida de API a producción **Heroku**.
-   Subida de base de datos a producción **MongoDB Atlas**.

## :calendar: Semana **6** ( 17/05 - 23/05 )

-   Proyecto **Ionic app**.

-   Trabajando en el calendario.
    -   Diseño de la página para añadir eventos.
    -   Diseño de la página para ver el evento individualmente.
    -   Añadir eventos por fecha y hora.
    -   Reflejar los eventos marcados.

## :calendar: Semana **7** ( 24/05 - 30/05 )

-   Proyecto **Ionic app**.

-   Reestructuración del proyecto.

    -   Eliminando código, páginas y componentes innecesarios.
    -   Reestructrando carpetas y organizando de manera más lógica la estructura del proyecto.

-   Diseño

    -   Creando el splashscreen y inserción de los logos e imágenes.
    -   Ultimando cambios en el diseño.

-   Proyecto **Angular app**.

-   Subiendo la app i-admin a producción (Heroku).

## :calendar: Semana **8** ( 31/05 - 06/06 )

-   Proyecto **Angular app**.

-   Diseño

    -   Trabajando en el login.
    -   Creando los dialogos para crear y editar usuarios, listas, items y eventos.
    -   Creando toast para información.

-   Lógica:
    -   Crear y editar usuarios, listas, items y eventos.
    -   Trabajando con [@angular-material-components/datetime-picker](https://www.npmjs.com/package/@angular-material-components/datetime-picker)
