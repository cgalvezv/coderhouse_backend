class ProductosController {
    constructor(persistence) {
        this.persistence = persistence;
        this.tableName = 'productos';
    }

    /**
     * Método que obtiene todos los productos disponibles, o un producto en específico, si es que se este recibe un ID
     * @param {number} id es el identificador del producto, si es que se desea obtener un producto en específico
     * @returns la lista de todos los productos, o un producto en específico si se recibe su ID
     */
    async get(id = null, query = null) {
        let llave = null
        if (id) llave = 'id';
        const response = await this.persistence.read(this.tableName, llave, id, query);
        if (response.length <= 0) return { error: -1, code: 400, msg: id ? 'Producto no encontrado' : 'No hay productos cargados' }
        return response;
    }

    /**
     * Método que agrega un producto al listado de productos
     * @param {string} titulo es el titulo del producto a agregar
     * @param {string} descripcion es la descripcion del producto a agregar
     * @param {string} codigo es el codigo del producto a agregar
     * @param {number} precio es el precio de producto a agregar
     * @param {string} foto_url es la url de la imagen del producto a agregar
     * @param {number} stock es el stock del producto a agregar
     * @returns el producto que fue agregado al listado de productos
     */
    async add(titulo, descripcion, codigo, precio, foto_url, stock) {
        const product = { titulo, descripcion, codigo, precio, foto_url, stock };
        return await this.persistence.create(this.tableName, product);
    }

    /**
     * Actualiza un producto en específico
     * @param {number} id es el identificador del producto a actualizar
     * @param {string} titulo es el nuevo titulo del producto
     * @param {string} descripcion es la nueva descripcion del producto
     * @param {string} codigo es el nuevo codigo del producto
     * @param {number} precio es el nuevo precio del producto
     * @param {string} foto_url es el nuevo url thumbnail del producto
     * @param {number} stock es el nuevo stock del producto
     * @returns el producto que fue actualizado en listado de productos
     */
    async edit(id, titulo, descripcion, codigo, precio, foto_url, stock) {
        const newProduct = { titulo, descripcion, codigo, precio, foto_url, stock };
        const { ok } = await this.persistence.update(this.tableName, 'id', id, newProduct);
        if (!Boolean(ok)) return { error: -1, code: 400, msg: 'Error al actualizar producto' }
        return Boolean(ok);
    }

    /**
     * Elimina un producto en específico
     * @param {number} id es el identificador del producto a eliminar
     * @returns el producto que fue eliminado
     */
    async delete(id) {
        const { deletedCount } = await this.persistence.delete(this.tableName, 'id', id);
        if (!Boolean(deletedCount)) return { error: -1, code: 400, msg: 'Error al eliminar producto' }
        return Boolean(deletedCount);
    }
}

// exporto una instancia de la clase
module.exports = ProductosController;