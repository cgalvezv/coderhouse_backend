# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 10


### Features
- Servidor simple creado con NPM y Express
- Se prueba websocket's utilizando dependencia **Socket IO**
- Se utiliza template string para implementación dinámica de la tabla de productos

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
http://localhost:8080 - [Muestra el formulario para agregar un nuevo producto al listado y tambien la tabla de productos de manera dinámica cuando se va agregando un producto nuevo]
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**
