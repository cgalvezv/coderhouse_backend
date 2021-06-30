# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 16


### Features
- Se prueba conexión a base de datos utilizando la dependencia **Knex**.
- Para esta prueba se divide en dos las lógicas donde se probará la conexión. Estas son **Productos** y **Canal de chat**.
  - Para los productos:
    - Se utiliza una API REST para el manejo de productos, desarrollada con **Express**
    - Se utiliza como motor de base de datos **MySql**.
    - Se puede probar en Postman o en la interfaz existente.
  - Para el canal de chat:
    - Se implementan websocket's utilizando dependencia **Socket IO**.
    - Se utiliza como motor de base de datos **SqLite3**.
    - Solamente se puede probar por la interfaz gráfica.
- Se utiliza template string para implementación dinámica de la tabla de productos y del canal de chat

### Requisitos
Para el buen funcionamiento de este servidor, es **extrictamente** necesario tener en cuenta los siguientes puntos:

- Para agregar un producto nuevo, el objeto debe cumplir con la siguiente estructura:
```sh
{ 
    "title": "Escuadra",
    "price": 123.55,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}
```

- El formato del objeto que contiene un mensaje del chat es el siguiente:
```sh
{
  id: '2',
  email: 'camilogalvezv@gmail.com',
  fecha: '22/06/2021 20:35:10',
  mensaje: 'Hola'
}
```
- Para la conexión a la base de datos MySQL se debe tener en cuenta como consideración inicial y para el **correcto funcionamiento** del servidor, la base de datos donde se migrará la tabla de los productos, debe llamarse `test`. Para las credenciales de conexión a la base de datos MySQL, se deja en el repositorio un archivo llamado `.env.example` en donde se debe agregar las credenciales del servidor local MySQL, antes de correr el proceso de migración.

- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación y próxima ejecución del servidor, se debe ejecutar los siguientes comandos:
```sh
cd coderhouse_backend
npm install
npm run migrate
npm start
```

El servidor se ejecutará de manera local en el puerto `8080`.

### Listado de vistas disponibles

```sh
http://localhost:8080 - [Muestra el formulario para agregar un nuevo producto al listado y además muestra canal de chat]
```

### Listado de endpoints disponibles en la API

```sh
http://localhost:8080/api/productos/listar - GET [Obtiene el listado de productos]
http://localhost:8080/api/productos/listar/:id - GET [Obtiene un producto en específico]
http://localhost:8080/api/productos/guardar - POST [Agrega un producto nuevo]
http://localhost:8080/api/productos/actualizar/:id - PUT [Edita un producto en específico]
http://localhost:8080/api/productos/borrar/:id - DELETE [Elimina un producto en específico]
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**

