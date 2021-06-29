class Producto {
    constructor(id, titulo, descripcion, codigo, precio, foto_url, stock) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.precio = precio;
        this.foto_url = foto_url;
        this.stock = stock;
        this.timestamp = Date.now();
    }
}

module.exports = Producto;