const Archivo = require('../database/archivo');
const CarroItem = require('./carroItem');

class Carro {
    constructor() {
        this.fileCarro = new Archivo(require('path').resolve(__dirname, '../database/carro.txt'));
        this.fileProductos = new Archivo(require('path').resolve(__dirname, '../database/productos.txt'));
    }
    
    /***
     * Método que inicializa la clase, trayendo la info desde el archivo utilizado para persisitir 
     */
    async init() {
        this.list = await this.fileCarro.leer();
        this.products = await this.fileProductos.leer();
        this.currentId = this.list.length + 1;
    }

    /**
     * Método que obtiene todos los items del carrito disponibles, o un item en específico, si es que se este recibe un ID
     * @param {number} id 
     * @returns la lista de todos los items del carrito, o un item en específico si se recibe su ID
     */
    get(id = null) {
        if (this.list.length <= 0) return { error: -1, codigo: 400, descripcion: 'No hay carro de compras cargados' }
        if(!id) return this.list;
        const cartFinded = this.list.find(cart => cart.id == id);
        if (!cartFinded) return { error: -1, codigo: 400, descripcion: 'Carro de compras no existente' }
        return cartFinded;
    }

    /**
     * Método que agrega un item de carrito, con un producto existente en la base de datos
     * @param {number} id_producto es el ID del producto que se desea agregar al carrito
     * @returns el item de carrito, con el producto agregado
     */
    add(id_producto) {
        const product = this.products.find(product => product.id == id_producto)
        if (product === undefined) return { error: -1, codigo: 400, descripcion: 'Producto a agregar no existente' }
        const newCarro = new CarroItem(this.currentId)
        newCarro.producto = product;
        this.list.push(newCarro);
        this.currentId++;
        this.fileCarro.reiniciar(this.list)
        return newCarro;
    }
    
    /**
     * Método que elimina un item del carrito
     * @param {number} id es el ID del item a eliminar
     * @returns el item del carrito eliminado
     */
    delete(id) {
        const idxCartToDelete = this.list.findIndex(cart => cart.id == id);
        if (idxCartToDelete < 0) return { error: -1, codigo: 400, descripcion: 'Carro no encontrado' }
        const response = this.list.splice(idxCartToDelete, 1)[0];
        this.fileCarro.reiniciar(this.list)
        return response;
    }
}

// exporto una instancia de la clase
module.exports = new Carro();