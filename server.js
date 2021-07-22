//Proyecto Final - Entrega 2
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
require('dotenv').config();

const http = require('http').Server(app);;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = process.env.PORT || 8080;

//#region LOGICA PERSISTENCE FACTORY
const daoFactory = require('./src/database')
//* Codigo persistencias:
//* 1.- MySQL (local)
//* 2.- SQLite (local)
//* 3.- Mongo (local)
//* 4.- Mongo (DBaaS)
const persistenceSelected = 2 //?VALOR A CAMBIAR PARA LA PERSISTENCIA.
const Persistence = daoFactory.getPersistence(persistenceSelected);
const persistenceInstance = new Persistence();
persistenceInstance.connect();
//#endregion

//#region LOGICA ROUTER
const router = require('./src/routes');
app.use('/api/productos', new router.Productos(persistenceInstance).getRouter());
app.use('/api/carrito', new router.Carros(persistenceInstance).getRouter());
//#endregion

// Manejo de error, al acceder a rutas no implementadas
app.use((req, res) => {
    res.status(404).send({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});