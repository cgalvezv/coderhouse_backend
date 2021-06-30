const express = require('express');
const router = express.Router();

const productosController = require('../api/productos');

//GET: Obtener todo el listado de productos
router.get('/listar', async (req, res) => {
    const response = await productosController.get();
    if (response.error) res.status(response.code).json({ error: true, msg: response.msg });
    res.status(200).json(response);
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
router.get('/listar/:id', (req, res) => {
    const { id } = req.params;
    const response = productosController.get(id);
    if (response.error) res.status(response.code).json({ error: true, msg: response.msg });
    res.status(200).json(response);
})
//POST: Agregar un nuevo producto al listado de productos
router.post('/guardar', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const response = await productosController.add(title, price, thumbnail)
    res.status(200).json(response);
})
//PUT: Agregar un nuevo producto al listado de productos
router.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const response = await productosController.edit(id, title, price, thumbnail)
    res.status(200).json(response);
})
//DELETE: Agregar un nuevo producto al listado de productos
router.delete('/borrar/:id', async (req, res) => {
    const { id } = req.params;
    const response = await productosController.delete(id)
    res.status(200).json(response);
})

module.exports = router;