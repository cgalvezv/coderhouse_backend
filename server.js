//Desafío 8 - Express avanzado - parte 2
//author: Camilo Gálvez Vidal
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


//#region LOGICA MIDDLEWARE ERROR HANDLER
app.use((err, req, res, next) => {
    return res.status(500).send(`Error Servidor\n${JSON.stringify(err.message, null, 2)}`);
});
//#endregion

//#region LOGICA STATICS FILE
app.get('/', (req, res) => {
    res.sendFile('index');
});
//#region 

//#region LOGICA ROUTER
const router = require('./src/routes/productos');
app.use('/api/productos', router);
//#endregion


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});