//Desafío 20- Mongo y NodeJS
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const controller = require('./src/api/mensajes');
const config = require('./src/config/config.json');
const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);
require('./src/database/connection');


let messages = [];
let products = [];

const puerto = process.env.PORT || config.PORT;

// Configuraciones para Express
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile('index', { root: __dirname });
});

//#region LOGICA ROUTER
const routerProductos = require('./src/routes/productos');
app.use('/api/productos', routerProductos);
//#endregion


//#region MANEJO SOCKETS
io.on('connection', async (socket) => {
    const responseProducts = await fetch(`http://localhost:${puerto}/api/productos/listar`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });
    products = await responseProducts.json();
    io.sockets.emit('productos', products)
    socket.on('update', async (isOK) => {
        if (isOK) {
            const responseProducts = await fetch(`http://localhost:${puerto}/api/productos/listar`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });
            products = await responseProducts.json();
            io.sockets.emit('productos', products)
        }
    })

    messages = await controller.getAll();
    io.sockets.emit('messages', messages);
    socket.on('new-message', async (msj) => {
        await controller.create(msj)
        messages = await controller.getAll();
        io.sockets.emit('messages', messages);
    })
});
//#endregion

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});