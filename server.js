//Proyecto Final - Entrega 1
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();

const http = require('http').Server(app);;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = process.env.PORT || 8080;

//#region LOGICA ROUTER
const router = require('./src/routes');
app.use('/api/productos', router.productos);
app.use('/api/carrito', router.carro);
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