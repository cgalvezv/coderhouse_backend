const express = require('express');
const router = express.Router();

const productos = require('../classes/productos');

//GET: Obtener todo el listado de productos
router.get('/listar', (req, res) => {
    const response = productos.get();
    if (response.error) res.status(response.code).json({ error: true, msg: response.msg });
    res.status(200).json(response);
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
router.get('/listar/:id', (req, res) => {
    const { id } = req.params;
    const response = productos.get(id);
    if (response.error) res.status(response.code).json({ error: true, msg: response.msg });
    res.status(200).json(response);
})
//POST: Agregar un nuevo producto al listado de productos
router.post('/guardar', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const response = productos.add(title, price, thumbnail)
    res.redirect('/');
    // res.status(200).json(response);
})
//PUT: Agregar un nuevo producto al listado de productos
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const response = productos.edit(id, title, price, thumbnail)
    res.status(200).json(response);
})
//DELETE: Agregar un nuevo producto al listado de productos
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;
    const response = productos.delete(id)
    res.status(200).json(response);
})

module.exports = router;