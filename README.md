# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 24


### Features
- Se prueba conexión a base de datos Mongo utilizando la dependencia **mongoose**.
- La base de datos en MongoDB a usar será **ecommerce**.
- Se agrega lógica para la gestión de la sesión, utilizando **Cookie Parser** y **Express Session**.
- La sesión será almacenada en **Mongo atlas**, utilizando la dependencia **Connect-Mongo**.
- Para esta prueba se divide en dos las lógicas donde se probará la conexión. Estas son **Productos** y **Canal de chat**.
  - Para los productos:
    - Se utiliza una API REST para el manejo de productos, desarrollada con **Express**
    - Se utiliza la colección **productos**
    - Se puede probar en Postman o en la interfaz existente.
  - Para el canal de chat:
    - Se implementan websocket's utilizando dependencia **Socket IO**.
    - Se normaliza el set de mensajes utilizando la dependencia **Normalizr**.
    - Se utiliza la colección **mensajes**
    - Solamente se puede probar por la interfaz gráfica.
- Se utiliza template string y **Handlebars** para implementación dinámica de la tabla de productos y del canal de chat
- Se agrega endpoint para obtener productos generados con datos falsos randomizados, utilizando la dependencia **Faker**.

### Requisitos
Para el buen funcionamiento de este servidor, es **extrictamente** necesario tener en cuenta los siguientes puntos:

- Para agregar un producto nuevo, el objeto debe cumplir con la siguiente estructura:
```sh
{ 
    "nombre": "Escuadra",
    "categoria": "Utiles escolares",
    "precio": 123.55,
    "stock": 100,
    "url": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}
```

- El formato del objeto que contiene un mensaje del chat es el siguiente:
```sh
{
  email: 'camilogalvezv@gmail.com',
  nombre: 'Camilo',
  apellido: 'Gálvez',
  edad: 30,
  alias: 'tito',
  avatar: 'url_avatar'
  texto: 'Hola'
}
```
- Para la conexión a la base de datos MongoDB se debe tener en cuenta como consideración inicial y para el **correcto funcionamiento** del servidor, la base de datos donde se crearán las coleciones y los documentos, debe llamarse `ecommerce`. Para las credenciales de conexión a la base de datos MongoDB, se deja en el repositorio un archivo llamado `.env.example` en donde se debe agregar la url de conección.

- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación y próxima ejecución del servidor, se debe ejecutar los siguientes comandos:
```sh
cd coderhouse_backend
npm install
npm start
```

El servidor se ejecutará de manera local en el puerto `8080`.

Al ingresar deberá iniciar sesión solo ingresando el _nombre_ del usuario.

### Listado de vistas disponibles

```sh
http://localhost:8080 - [Muestra el formulario para agregar un nuevo producto al listado y además muestra canal de chat]
http://localhost:8080/login - [Muestra el formulario realizar el inicio de sesión]
http://localhost:8080/logout - [Muestra la vista después de finalizar la sesión]
```

### Listado de endpoints disponibles en la API

```sh
http://localhost:8080/api/productos/listar - GET [Obtiene el listado de productos]
http://localhost:8080/api/productos/listar/:id - GET [Obtiene un producto en específico]
http://localhost:8080/api/productos/vista-test?cant=5 - GET [Obtiene el listado de productos con datos falsos]
http://localhost:8080/api/productos/guardar - POST [Agrega un producto nuevo]
http://localhost:8080/api/productos/actualizar/:id - PUT [Edita un producto en específico]
http://localhost:8080/api/productos/borrar/:id - DELETE [Elimina un producto en específico]
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**

