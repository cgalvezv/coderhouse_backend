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