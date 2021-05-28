//Desafío 8 - Express avanzado - parte 1
//author: Camilo Gálvez Vidal
const express = require('express');
const productos = require('./src/classes/productos');

// creo una app de tipo express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//#region IMPLEMTACIÓN ENDPOINTS
//GET: Obtener todo el listado de productos
app.get('/api/productos/listar', (req, res) => {
    const response = productos.get();
    if (response.error) res.status(response.code).json({ error: response.msg });
    res.status(200).json(response);
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
app.get('/api/productos/listar/:id', (req, res) => {
    const { id } = req.params;
    const response = productos.get(id);
    if (response.error) res.status(response.code).json({ error: response.msg });
    res.status(200).json(response);
})
//POST: Agregar un nuevo producto al listado de productos
app.post('/api/productos/guardar', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const response = productos.add(title, price, thumbnail)
    res.status(200).json(response);
})
//#endregion IMPLEMTACIÓN ENDPOINTS

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});