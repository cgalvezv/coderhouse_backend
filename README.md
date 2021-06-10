# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 11 - EJS


### Features
- Servidor simple creado con NPM y Express
- Se prueba métodos GET, POST, PUT y DELETE en un API REST
- Permite el listado de productos, utilizando **EJS** para express, como motor de plantillas
- Permite agregar un producto al listado existente, utilizando un formulario HTML
- Permite obtención, actualización y eliminación de un producto en específico

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

- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación y próxima ejecución del servidor, se debe ejecutar los siguientes comandos:
```sh
cd coderhouse_backend
npm install
npm start
```

El servidor se ejecutará de manera local en el puerto `8080`.

### Listado de vistas disponibles

```sh
http://localhost:8080 - [Muestra el formulario para agregar un nuevo producto al listado]
http://localhost:8080/productos/vista - [Muestra el listado de productos disponibles]
```

### Listado de endpoints disponibles

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
