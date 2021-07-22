class CarrosController {
    constructor(persistence) {
        this.persistence = persistence;
        this.tableName = 'carros';
        this.productTableName = 'productos';
    }
    
    /**
     * Método que obtiene todos los items del carrito disponibles, o un item en específico, si es que se este recibe un ID
     * @param {number} id 
     * @returns la lista de todos los items del carrito, o un item en específico si se recibe su ID
     */
    async get(id = null) {
        let llave = null
        if (id) llave = 'id';
        const response = await this.persistence.read(this.tableName, llave, id);
        if (response.length <= 0) return { error: -1, code: 400, msg: id ? 'Carrito no encontrado' : 'No hay carritos cargados' }
        return response;
    }

    /**
     * Método que agrega un item de carrito, con un producto existente en la base de datos
     * @param {number} id_producto es el ID del producto que se desea agregar al carrito
     * @returns el item de carrito, con el producto agregado
     */
    async add(id_producto) {
        const product = await this.persistence.read(this.productTableName, 'id', id_producto);
        if (product.length <= 0) return { error: -1, code: 400, msg: 'Producto a agregar no existente' }
        return await this.persistence.create(this.tableName, { producto: JSON.stringify(product) });
    }
    
    /**
     * Método que elimina un item del carrito
     * @param {number} id es el ID del item a eliminar
     * @returns el item del carrito eliminado
     */
    async delete(id) {
        const { deletedCount } = await this.persistence.delete(this.tableName, 'id', id);
        if (!Boolean(deletedCount)) return { error: -1, code: 400, msg: 'Error al eliminar carrito' }
        return Boolean(deletedCount);
    }
}

// exporto una instancia de la clase
module.exports = CarrosController;