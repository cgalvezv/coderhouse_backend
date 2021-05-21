# Programación Backend - Coderhouse
## Autor: _Camilo Gálvez Vidal_

## Desafío 7


### Features
- Servidor simple creado con NPM y Express
- Prueba método GET solamente

### Requisitos
Para el buen funcionamiento de este servidor, es **extrictamente** necesario tener en cuenta los siguientes puntos:
- Para la buena ejecución de los endpoints establecidos, es necesario generar en la raiz del repositorio el archivo `producto.txt` como fuente de datos. Se puede utilizar el siguiente ejemplo como archivo: 
```sh
[
	{
		"title": "Escuadra",
		"price": 123.45,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
		"id": 1
	},
	{
		"title": "Calculadora",
		"price": 234.56,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
		"id": 2
	},
	{
		"title": "Globo Terráqueo",
		"price": 345.67,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
		"id": 3
	}
]
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

Ante cualquier duda acerca del desarrollo, puede tomar contacto con el autor utilizando los siguientes medios de comunicación:
[Email]: <camilogalvezv@gmail.com>
[Slack]: <@Camilo Gálvez>
