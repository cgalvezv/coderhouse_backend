const Producto = require('./producto');
const Archivo = require('../database/archivo');

class Productos {
    constructor() {
        this.fileProductos = new Archivo(require('path').resolve(__dirname, '../database/productos.txt'));
    }

    /**
     * Método que inicializa la clase, trayendo la info desde el archivo utilizado para persisitir 
     */
    async init() {
        this.list = await this.fileProductos.leer();
        this.currentId = this.list.length + 1;
    }

    /**
     * Método que obtiene todos los productos disponibles, o un producto en específico, si es que se este recibe un ID
     * @param {number} id es el identificador del producto, si es que se desea obtener un producto en específico
     * @returns la lista de todos los productos, o un producto en específico si se recibe su ID
     */
    get(id = null) {
        if (this.list.length <= 0) return { error: -1, code: 400, msg: 'No hay productos cargados' }
        if(!id) return this.list;
        const productFinded = this.list.find(product => product.id == id);
        if (!productFinded) return { error: -1, code: 400, msg: 'producto no encontrado' }
        return productFinded;
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
    add(titulo, descripcion, codigo, precio, foto_url, stock) {
        const newProduct = new Producto(this.currentId, titulo, descripcion, codigo, precio, foto_url, stock);
        this.list.push(newProduct);
        this.currentId++;
        this.fileProductos.reiniciar(this.list)
        return newProduct;
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
    edit(id, titulo, descripcion, codigo, precio, foto_url, stock) {
        const idxProductToEdit = this.list.findIndex(product => product.id == id);
        this.list[idxProductToEdit].titulo = titulo;
        this.list[idxProductToEdit].descripcion = descripcion;
        this.list[idxProductToEdit].codigo = codigo;
        this.list[idxProductToEdit].precio = precio;
        this.list[idxProductToEdit].foto_url = foto_url;
        this.list[idxProductToEdit].stock = stock;
        this.fileProductos.reiniciar(this.list)
        return this.list[idxProductToEdit];
    }

    /**
     * Elimina un producto en específico
     * @param {number} id es el identificador del producto a eliminar
     * @returns el producto que fue eliminado
     */
    delete(id) {
        const idxProductToDelete = this.list.findIndex(product => product.id == id);
        if (idxProductToDelete < 0) return { error: -1, code: 400, msg: 'Carro no encontrado' }
        const response = this.list.splice(idxProductToDelete, 1)[0];
        this.fileProductos.reiniciar(this.list)
        return response;
    }
}

// exporto una instancia de la clase
module.exports = new Productos();