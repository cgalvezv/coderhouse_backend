const express = require('express');
const middleware = require('../middleware');
const routerProductos = express.Router();

const productos = require('../api/productos');
productos.init();
//GET: Obtener todo el listado de productos
routerProductos.get('/listar', async (req, res) => {
    const response = productos.get();
    if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
    res.status(200).json(response);
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
routerProductos.get('/listar/:id', (req, res) => {
    const { id } = req.params;
    const response = productos.get(id);
    if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
    res.status(200).json(response);
})
//POST: Agregar un nuevo producto al listado de productos
routerProductos.post('/agregar', middleware.auth.isAdmin, (req, res) => {
    const { titulo, descripcion, codigo, precio, foto_url, stock } = req.body;
    const response = productos.add(titulo, descripcion, codigo, precio, foto_url, stock)
    res.status(200).json(response);
})
//PUT: Actualizar un producto en el listado de productos
routerProductos.put('/actualizar/:id', middleware.auth.isAdmin,(req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, codigo, precio, foto_url, stock } = req.body;
    const response = productos.edit(id, titulo, descripcion, codigo, precio, foto_url, stock)
    res.status(200).json(response);
})
//DELETE: Borrar un producto del listado
routerProductos.delete('/borrar/:id', middleware.auth.isAdmin,(req, res) => {
    const { id } = req.params;
    const response = productos.delete(Number(id))
    if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
    res.status(200).json(response);
})

module.exports = routerProductos;