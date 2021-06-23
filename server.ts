//Desafío 14 - Transpiladores - TypeScript To JavaScriptES5
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();

const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// Clase para persistir mensaje en un archivo
import Archivo from './src/classes/archivo';

// indicamos donde se encuentran los archivos estaticos
app.use(express.static('./public'));

const productos: Array<any> = [];

// Instancio el archivo para guardar los mensajes
const msgFile = new Archivo('./src/database/mensajes.txt');
const messages: Array<any> = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;


app.get('/', (req: any, res: any) => {
    res.sendFile('index', { root: __dirname });
});


// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', async (socket: any) => {
    io.sockets.emit('productos', productos)
    socket.on('productoSocket', async ({ title, price, thumbnail }: any) => {
        productos.push({ id: socket.id, title, price, thumbnail });
        io.sockets.emit('productos', productos)
    })

    io.sockets.emit('messages', messages)
    socket.on('new-message', async ({ author, fyh, text }: any) => {
        const newMessage: any = { id: socket.id, author, fyh, text};
        await msgFile.guardar(newMessage) // Guardo en archivo de texto
        messages.push(newMessage);
        io.sockets.emit('messages', messages)
    })
});

const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', (error: any) => {
    console.log('error en el servidor:', error);
});