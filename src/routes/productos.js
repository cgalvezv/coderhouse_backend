const express = require('express');
const router = express.Router();
const controller = require('../api/productos');
const generator = require('../generator')

//GET: Obtener todo el listado de productos
router.get('/listar', async (req, res) => {
    try {
        const response = await controller.findAll();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})
//GET: Obtener todo el listado de productos
router.get('/vista-test', async (req, res) => {
    try {
        const { cant } = req.query;
        const response = []
        let  defaultCant = 10
        if (cant) defaultCant = Number(cant);
        if (defaultCant !== 0) {
            for (let i = 0; i < defaultCant; i++) response.push(generator.producto.getFake())
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
router.get('/listar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await controller.findById(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})
//POST: Agregar un nuevo producto al listado de productos
router.post('/guardar', async (req, res) => {
    try {
        const response = await controller.create(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})
//PUT: Agregar un nuevo producto al listado de productos
router.put('/actualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await controller.update(id, req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})
//DELETE: Agregar un nuevo producto al listado de productos
router.delete('/borrar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await controller.remove(id)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})

module.exports = router;