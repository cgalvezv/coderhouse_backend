const fs = require('fs');

/**
 * Método que convierte un string recibido de la lectura de archivo a Array, eliminando todos los \n y \t existentes
 * @param {string} fileString es el string obtenido de la lectura de archivo
 * @returns el string recibido convertido en formato array
 */
const fileStringToArray = fileString => JSON.parse(fileString.replace(/(?:\n\t|\n|\t)/g,''));

class Archivo {
    constructor(filename) {
        this.filename = filename;
    }

    /**
     * Método que lee un archivo dado
     * @returns el contenido del archivo leído
     */
    async leer() {
        try {
            const mensajes = await fs.promises.readFile(this.filename, 'utf-8')
            return fileStringToArray(mensajes.toString());
        } catch {
            await fs.promises.writeFile(this.filename, '[]')
            return [];
        }   
    }

    /**
     * Método que guarda un elemento dentro del arreglo del archivo
     * @param {string} mensaje es el mensaje que se desea guardar dentro del arreglo existente en el archivo
     */
    async guardar(mensaje) {
        try {
            const mensajes = await fs.promises.readFile(this.filename, 'utf-8')
            const mensajesArray = fileStringToArray(mensajes)
            mensajesArray.push(mensaje)
            await fs.promises.writeFile(this.filename, JSON.stringify(mensajesArray, null, '\t'))
        } catch (error) {
            console.error(error);
        }  
    }

    /**
     * Método para eliminar el archivo
     */
    async borrar() {
        fs.unlink(this.filename, error => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Archivo ${this.filename} eliminado`)
            }
        })
    }

    /**
     * Método que reemplaza el contenido actual del archivo
     * @param {string} mensajes es el nuevo contenido que tendrá el archivo
     */
    async reiniciar(mensajes) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(mensajes, null, '\t'))
        } catch (error) {
            console.error(error);
        } 
    }

}

module.exports = Archivo;