const express = require('express');
const router = express.Router();

class CarrosRouter {
    constructor(persistence) {
        const CarrosController = require('../api/carro');
        const controller = new CarrosController(persistence);
        //GET: Obtener todo el listado de carros de compra
        router.get('/listar', async (req, res) => {
            const response = await controller.get();
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json(response);
        })
        //GET: Obtener un item carro en específico, recibiendo el ID desde el uri
        router.get('/listar/:id', async (req, res) => {
            const { id } = req.params;
            const response = await controller.get(id);
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json(response);
        })
        //POST: Agregar un nuevo item carro al listado de carros de compra
        router.post('/agregar/:id_producto', async (req, res) => {
            const { id_producto } = req.params;
            const response = await controller.add(id_producto)
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json({ msg: 'Carrito creado!' });
        })
    
        //DELETE: Borrar un item del carro
        router.delete('/borrar/:id', async (req, res) => {
            const { id } = req.params;
            const response = await controller.delete(id);
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json({ msg: 'Carrito eliminado!' });
        })
    }


    getRouter() { return router }
}

module.exports = CarrosRouter;