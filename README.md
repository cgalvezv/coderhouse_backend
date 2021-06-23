# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 14


### Features
- Servidor simple creado con NPM y Express
- Se prueba websocket's utilizando dependencia **Socket IO**
- Con la misma herramienta anterior se crea un canal de chat
- Se utiliza template string para implementación dinámica de la tabla de productos
- Se implementa transpilación para traducir Javascript ES6 a Javascript ES5
- Se implementa transpilación para traducir Typescript a Javascript ES5

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
  id: 'x6GZQw1DOwqEA1SPAAAD',
  author: 'Camilo',
  fyh: '22/06/2021 20:35:10',
  text: 'Hola'
}
```

- Este servidor utilizará como característica la recompilación automática cuando se detecte un cambio, utilizando el paquete `nodemon`. Por este motivo, es necesario que dicha dependencia este agregada en el archivo `package.json`. Si no se encontrara la dependencia, se puede instalar en el directorio local del repositorio, utilizando el comando `npm install nodemon --save`.

### Instalación y ejecución
Para la instalación, transpilación de los archivos que están en Javascript ES6 y próxima ejecución, se debe ejecutar los siguientes comandos :
```sh
cd coderhouse_backend
npm install
npm run ServerJS6toJS5
```

Para la instalación, transpilación de los archivos que están en Typescript y próxima ejecución, se debe ejecutar los siguientes comandos :
```sh
cd coderhouse_backend
npm install
npm run ServerTStoJS5
```

El servidor se ejecutará de manera local en el puerto `8080`.

### Listado de vistas disponibles

```sh
http://localhost:8080 - [Muestra el formulario para agregar un nuevo producto al listado y además muestra canal de chat]
```

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: **@Camilo Gálvez**

