class Productos {
    constructor() {
        this.list = [];
        this.currentId = 1;
    }

    /**
     * Método que todos los productos disponibles, o un producto en específico, si es que se este recibe un ID
     * @param {number} id es el identificador del producto, si es que se desea obtener un producto en específico
     * @returns la lista de todos los productos, o un producto en específico si se recibe su ID
     */
    get(id = null) {
        if (this.list.length <= 0) return { error: true, code: 400, msg: 'No hay productos cargados' }
        if(!id) return this.list;
        const productFinded = this.list.filter(product => product.id == id);
        if (!productFinded) return { error: true, code: 400, msg: 'producto no encontrado' }
        return productFinded;
    }

    /**
     * Método que agrega un producto al listado de productos
     * @param {string} title es el titulo del producto a agregar
     * @param {number} price es el precio de producto a agregar
     * @param {string} thumbnail es la url de la imagen del producto a agregar
     * @returns el producto que fue agregado al listado de productos
     */
    add(title, price, thumbnail) {
        const newProduct = new Producto(this.currentId, title, price, thumbnail);
        this.list.push(newProduct);
        this.currentId++;
        return newProduct;
    }

    /**
     * Actualiza un producto en específico
     * @param {number} id es el identificador del producto a actualizar
     * @param {string} title es el nuevo titulo del producto
     * @param {number} price es el nuevo precio del producto
     * @param {string} thumbnail es el nuevo url thumbnail del producto
     * @returns el producto actualizado
     */
    edit(id, title, price, thumbnail) {
        const idxProductToEdit = this.list.findIndex(product => product.id == id);
        this.list[idxProductToEdit].title = title;
        this.list[idxProductToEdit].price = price;
        this.list[idxProductToEdit].thumbnail = thumbnail;
        return this.list[idxProductToEdit];
    }

    /**
     * Elimina un producto en específico
     * @param {number} id es el identificador del producto a eliminar
     * @returns el producto que fue eliminado
     */
    delete(id) {
        const idxProductToDelete = this.list.findIndex(product => product.id == id);
        return this.list.splice(idxProductToDelete, 1)[0];
    }
}

class Producto {
    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

// exporto una instancia de la clase
module.exports = new Productos();