const express = require('express');
const middleware = require('../middleware');
const router = express.Router();


class ProductosRouter {
    constructor(persistence) {
        const ProductosController = require('../api/productos');
        const controller = new ProductosController(persistence);
        //GET: Obtener todo el listado de productos
        router.get('/listar', async (req, res) => {
            const response = await controller.get(null, req.query);
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json(response);
        })
        //GET: Obtener un producto en específico, recibiendo el ID desde el uri
        router.get('/listar/:id', async (req, res) => {
            const { id } = req.params;
            const response = await controller.get(id);
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json(response);
        })
        //POST: Agregar un nuevo producto al listado de productos
        router.post('/agregar', middleware.auth.isAdmin, async (req, res) => {
            const { titulo, descripcion, codigo, precio, foto_url, stock } = req.body;
            const response = await controller.add(titulo, descripcion, codigo, precio, foto_url, stock)
            if (response) res.status(200).json({ msg: 'Producto creado!' });
        })
        //PUT: Actualizar un producto en el listado de productos
        router.put('/actualizar/:id', middleware.auth.isAdmin, async (req, res) => {
            const { id } = req.params;
            const { titulo, descripcion, codigo, precio, foto_url, stock } = req.body;
            const response = await controller.edit(id, titulo, descripcion, codigo, precio, foto_url, stock)
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json({ msg: 'Producto actualizado!' });
        })
        //DELETE: Borrar un producto del listado
        router.delete('/borrar/:id', middleware.auth.isAdmin, async (req, res) => {
            const { id } = req.params;
            const response = await controller.delete(id)
            if (response.error) res.status(response.code).json({ error: -1, msg: response.msg });
            res.status(200).json({ msg: 'Producto eliminado!' });
        })
    }

    getRouter() { return router }
}


module.exports = ProductosRouter;