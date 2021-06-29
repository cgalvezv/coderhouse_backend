# Programación Backend - Coderhouse
# Proyecto Final
## Autor: _Camilo Gálvez Vidal_

## Entrega 1


### Features
- Servidor API REST creado con NPM y Express
- Implementa endpoints para la gestión de **productos** y del **carro de compras**.
- Se utilizan métodos, GET, POST, PUT, DELETE.
- Se agrega un middleware para el manejo de los usuarios con rol de **administradores**.
- Se agrega manejo de errores.

### Requisitos
Para el buen funcionamiento de este servidor, es **extrictamente** necesario tener en cuenta los siguientes puntos:

- Para agregar un producto nuevo, el objeto debe cumplir con la siguiente estructura:
```sh
{ 
    "titulo": "Escuadra",
    "descripcion": "De 30 cm",
    "codigo": "AB12345",
    "foto_url": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "precio": 123.55,
    "stock": 20
}
```

- Para informar que el usuario que esta interactuando es **administrador**, dentro del objeto se debe agregar el siguiente campo:
```sh
{ 
    "administrador": true
}
```


- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación, transpilación de los archivos que están en Javascript ES6 y próxima ejecución, se debe ejecutar los siguientes comandos :
```sh
cd coderhouse_backend
npm install
npm start
```

El servidor se ejecutará de manera local en el puerto `8080` ([http://localhost:8080]) y también existe una versión en Glitch ({https://unequaled-garnet-homegrown.glitch.me]).

### Listado de url's disponibles en la API

- **Productos**

```sh
{url}/api/productos/listar - GET [Obtiene el listado de productos]
{url}/api/productos/listar/:id - GET [Obtiene un producto en específico]
{url}/api/productos/agregar - POST [Agrega un producto nuevo]
{url}/api/productos/actualizar/:id - PUT [Edita un producto en específico]
{url}/api/productos/borrar/:id - DELETE [Elimina un producto en específico]
```

- **Carro de compras**

```sh
{url}/api/carrito/listar - GET [Obtiene el listado de items del carrito]
{url}/api/carrito/listar/:id - GET [Obtiene un item del carrito en específico]
{url}/api/carrito/agregar - POST [Agrega un item de carrito nuevo]
{url}/api/carrito/borrar/:id - DELETE [Elimina un items de carrito en específico]
```

### Listado de errores 

- Recurso no autorizado
```sh
{
    "error": -1,
    "descripcion": "ruta {nombre_ruta} metodo {nombre_metodo} no autorizada"
}
```

- Recurso no implementado
```sh
{
    "error": -2,
    "descripcion": "ruta {nombre_ruta} metodo {nombre_metodo} no implementada"
}
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**

