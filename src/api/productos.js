const Producto = require('../models/producto');
const BaseController = require('./base');

class ProductoController extends BaseController {
    constructor() {
        super(Producto);
    }
}

// exporto una instancia de la clase
module.exports = new ProductoController();