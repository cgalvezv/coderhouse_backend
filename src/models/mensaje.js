const knex = require('../database/knex');

class Mensaje {
    constructor() {}

    /**
     * Método que agrega una fila de datos (mensaje y su contenido) a la tabla de mensajes en la base de datos
     * @param {object} contenido contenido del mensaje que se desea guardar
     * @returns true si el contenido fue agregado a la base de datos de manera exitosa
     */
    async guardar(contenido) {
        try {
            return await knex.sqlite3('mensajes').insert(contenido);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que obtiene todos los registros de mensajes existentes en la base de datos
     * @returns Toda las filas existentes en la tabla mensajes
     */
    async obtenerTodos() {
        try {
            return await knex.sqlite3('mensajes');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Mensaje();