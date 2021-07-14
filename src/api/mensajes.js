const Mensaje = require('../models/mensaje');
const BaseController = require('./base');

class MensajeController extends BaseController {
    constructor() {
        super(Mensaje);
    }
}

// exporto una instancia de la clase
module.exports = new MensajeController();

