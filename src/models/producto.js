const knex = require('../database/knex');

class Producto {
    constructor() {}

    /**
     * Método que guarda un contenido de un producto en la base de datos
     * @param {object} contenido es el contenido que se desea agregar en los registros de la tabla productos de la base de datos
     * @returns true si el producto fue agregado en la base de datos de manera exitosa
     */
    async guardar(contenido) {
        try {
            return await knex.mysql('productos').insert(contenido);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que lista todos los registros de la tabla productos, existentes en la base de datos
     * @returns todos los registros existentes en la tabla productos
     */
    async obtenerTodos() {
        try {
            return await knex.mysql('productos');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que obtiene un registro de producto, en base a una condicion que debe ser recibida en el formato llave, valor
     * @param {string} llave es la llave de búsqueda del registro que se desea traer
     * @param {string} valor es el valor de la llave de búsqueda del registro que se desea traer
     * @returns el registro de la tabla productos, que cumpla con la condicion recibida
     */
    async obtenerUno(llave, valor) {
        try {
            const response = await knex.mysql('productos').where(llave, valor);
            return JSON.parse(JSON.stringify(response))[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que actualiza un registro de producto, en base a una condicion que debe ser recibida en el formato llave, valor
     * @param {string} llave es la llave de búsqueda del registro que se desea actualizar
     * @param {string} valor es el valor de la llave de búsqueda del registro que se desea actualizar
     * @param {object} nuevoContenido 
     * @returns el registro de producto que fue actualizado
     */
    async actualizarUno(llave, valor, nuevoContenido) {
        try {
            const response = await knex.mysql('productos').where(llave, valor).update(nuevoContenido);
            return JSON.parse(JSON.stringify(response))[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Método que elimina un registro de producto, en base a una condicion que debe ser recibida en el formato llave, valor
     * @param {string} llave es la llave de búsqueda del registro que se desea borrar   
     * @param {string} valor es el valor de la llave de búsqueda del registro que se desea eliminar
     * @returns el registro de producto que fue eliminado
     */
    async borrarUno(llave, valor) {
        try {
            const response = await knex.mysql('productos').where(llave, valor).del();
            return JSON.parse(JSON.stringify(response))[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Producto();