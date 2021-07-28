const Mensaje = require('../models/mensaje');
const BaseController = require('./base');
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schemaMensajes = require('../schemas/mensajes')

class MensajeController extends BaseController {
    constructor() {
        super(Mensaje);
    }

    async getAll() {
        try {
            let mensajes = await this.findAll()
            let mensajesConId = { 
                id: 'mensajes', 
                mensajes : mensajes.map( mensaje => ({...mensaje._doc}))
            }
            console.log(JSON.stringify(mensajesConId).length)
            let mensajesConIdN = normalize(mensajesConId, schemaMensajes)
            return mensajesConIdN;
        }
        catch {
            return []
        }
    }
}

// exporto una instancia de la clase
module.exports = new MensajeController();

