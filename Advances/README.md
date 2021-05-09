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
