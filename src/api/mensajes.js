const Mensaje = require('../models/mensaje');

class MensajesController {
    constructor() {}

    /**
     * Método que agreaga un mensaje en el chat
     * @param {object} mensaje es el mensaje que se desea agregar
     * @returns un 1 si el mensaje fue agregado de forma exitosa
     */
    async add(mensaje) {
        try {
            return await Mensaje.guardar(mensaje); 
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que obtiene todos los mensajes del chat
     * @returns el listado de mensajes del chat para
     */
    async getAll() {
        try {
            return await Mensaje.obtenerTodos();
        } catch (error) {
            throw error;
        }
    }
}

// exporto una instancia de la clase
module.exports = new MensajesController();