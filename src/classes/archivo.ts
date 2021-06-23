const fs = require('fs');

/**
 * Método que convierte un string recibido de la lectura de archivo a Array, eliminando todos los \n y \t existentes
 * @param {string} fileString es el string obtenido de la lectura de archivo
 * @returns el string recibido convertido en formato array
 */
const fileStringToArray = (fileString: string) => JSON.parse(fileString.replace(/(?:\n\t|\n|\t)/g,''));

export default class Archivo {
    private filename: string;
    constructor(filename: string) {
        this.filename = filename;
    }

    async leer() {
        try {
            const mensajes = await fs.promises.readFile(this.filename, 'utf-8')
            console.log(fileStringToArray(mensajes.toString()))
            return fileStringToArray(mensajes.toString());
        } catch {
            console.log([]);
            return [];
        }   
    }

    async guardar(mensaje: string) {
        try {
            const mensajes = await fs.promises.readFile(this.filename, 'utf-8')
            console.log(mensaje)
            const mensajesArray = fileStringToArray(mensajes)
            mensajesArray.push(mensaje)
            await fs.promises.writeFile(this.filename, JSON.stringify(mensajesArray, null, '\t'))
        } catch (error) {
            console.error(error);
        }  
    }

    async borrar() {
        fs.unlink(this.filename, (error: any) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`Archivo ${this.filename} eliminado`)
            }
        })
    }
}