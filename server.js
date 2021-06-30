//Desafío 17- Node y SQL - Parte 2
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// indicamos donde se encuentran los archivos estaticos
app.use(express.static('./public'));

const mensajeController = require('./src/api/mensajes')
const Productos = require('./src/models/producto')

let messages = [];
let products = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;


app.get('/', (req, res) => {
    res.sendFile('index', { root: __dirname });
});

//#region LOGICA ROUTER
const routerProductos = require('./src/routes/productos');
app.use('/api/productos', routerProductos);
//#endregion


// cuando se realice la conexion, se ejecutara una sola vez
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

    messages = await mensajeController.getAll();
    io.sockets.emit('messages', messages);
    socket.on('new-message', async ({ email, mensaje }) => {
        await mensajeController.add({ email, mensaje })
        messages = await mensajeController.getAll();
        io.sockets.emit('messages', messages);
    })
});

const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});