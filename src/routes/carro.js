const express = require('express');
const routerCarro = express.Router();

const carro = require('../api/carro');
carro.init();

//GET: Obtener todo el listado de carros de compra
routerCarro.get('/listar', (req, res) => {
    const response = carro.get();
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})
//GET: Obtener un item carro en específico, recibiendo el ID desde el uri
routerCarro.get('/listar/:id', (req, res) => {
    const { id } = req.params;
    const response = carro.get(id);
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})
//POST: Agregar un nuevo item carro al listado de carros de compra
routerCarro.post('/agregar/:id_producto', async (req, res) => {
    const { id_producto } = req.params;
    const response = carro.add(id_producto)
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})

//DELETE: Borrar un item del carro
routerCarro.delete('/borrar/:id', async (req, res) => {
    const { id } = req.params;
    const response = carro.delete(id);
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})

module.exports = routerCarro;