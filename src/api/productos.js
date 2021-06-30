const Producto = require('../models/producto');

class ProductosController {
    constructor() {}
    /**
     * Método que todos los productos disponibles, o un producto en específico, si es que se este recibe un ID
     * @param {number} id es el identificador del producto, si es que se desea obtener un producto en específico
     * @returns la lista de todos los productos, o un producto en específico si se recibe su ID
     */
    async get(id = null) {
        try {
            const products = await Producto.obtenerTodos();
            if (products.length <= 0) return { error: true, code: 400, msg: 'No hay productos cargados' }
            if(!id) return products;
            const productFinded = products.filter(product => product.id == id);
            if (!productFinded) return { error: true, code: 400, msg: 'producto no encontrado' }
            return productFinded;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que agrega un producto al listado de productos
     * @param {string} title es el titulo del producto a agregar
     * @param {number} price es el precio de producto a agregar
     * @param {string} thumbnail es la url de la imagen del producto a agregar
     * @returns el producto que fue agregado al listado de productos
     */
     async add(title, price, thumbnail) {
        try {
            const responseInsert = await Producto.guardar({ title, price, thumbnail });
            const newProduct = await Producto.obtenerUno('id', responseInsert[0]);
            return newProduct;       
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualiza un producto en específico
     * @param {number} id es el identificador del producto a actualizar
     * @param {string} title es el nuevo titulo del producto
     * @param {number} price es el nuevo precio del producto
     * @param {string} thumbnail es el nuevo url thumbnail del producto
     * @returns el producto actualizado
     */
    async edit(id, title, price, thumbnail) {
        try {
            await Producto.actualizarUno('id', id, { title, price, thumbnail });
            const productUpdated = await Producto.obtenerUno('id', id);
            if (productUpdated === undefined) return { error: true, code: 400, msg: 'producto no existente para actualizar' }
            return productUpdated;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Elimina un producto en específico
     * @param {number} id es el identificador del producto a eliminar
     * @returns el producto que fue eliminado
     */
    async delete(id) {
        try {
            const productDeleted = await Producto.obtenerUno('id', id);
            await Producto.borrarUno('id', id);
            if (productDeleted === undefined) return { error: true, code: 400, msg: 'producto no existente para eliminar' }
            return productDeleted;
        } catch (error) {
            throw error;
        }
    }
}

// exporto una instancia de la clase
module.exports = new ProductosController();