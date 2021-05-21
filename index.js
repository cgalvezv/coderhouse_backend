//Desafío 7 - NPM y Express
//author: Camilo Gálvez Vidal
import express from 'express';
import fs from 'fs/promises';

// creo una app de tipo express
const app = express();

// defino variables estaticas
const port = 8080;
const filePath = './productos.txt';

//defino contadores de visitas
let itemsCount = 0
let itemCount = 0

// leo archivo para obtener productos
const products = await fs.readFile(filePath, 'utf-8');

/**
 * Método que convierte un string recibido de la lectura de archivo a Array, eliminando todos los \n y \t existentes
 * @param {string} fileString es el string obtenido de la lectura de archivo
 * @returns el string recibido convertido en formato array
 */
 const fileStringToArray = fileString => JSON.parse(fileString.replace(/(?:\n\t|\n|\t)/g,''));

/**
 * Método que retorna un número aleatorio entre un rango dado
 * @param {number} min inicio del rango
 * @param {number} max fin del rango + 1
 * @returns un número aleatorio
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//#region IMPLEMENTACION ENDPOINTS

// Endpoint para obtener todos los productos
app.get('/items', async (req, res) => {
    console.log('Accediendo ruta /items...')
    itemsCount++;
    const items = fileStringToArray(products);
    const cantidad = items.length;
    const response = { items, cantidad };
    console.log(`Respuesta enviada!!\n${JSON.stringify(response, null, 2)}`) 
    res.json(response);
});

// Endpoint para obtener un producto en aleatorio
app.get('/item-random', async (req, res) => {
    console.log('Accediendo ruta /item-random...')
    itemCount++;
    const items = fileStringToArray(products);
    const randomIndex = getRandomNumber(0, items.length);
    console.log(`Se escogerá el producto del array con indice ${randomIndex}`)
    const item = items[randomIndex];
    const response = { item }
    console.log(`Respuesta enviada!!\n${JSON.stringify(response, null, 2)}`) 
    res.json(response);
});
// Endpoint para obtener número de visitas a endpoints anteriores
app.get('/visitas', async (req, res) => {
    console.log('Accediendo ruta /visitas...')
    const visitas = {
        items: itemsCount,
        item: itemCount
    }
    const response = { visitas };
    console.log(`Respuesta enviada!!\n${JSON.stringify(response, null, 2)}`) 
    res.json(response);
});

//#endregion IMPLEMENTACION ENDPOINTS



//#region CONFIGURACION SERVER

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(port, () => {
    console.log(`servidor escuchando en http://localhost:${port}`);
});

// Manejo de errores
server.on('error', error => {
    console.error('error en el servidor:', error);
});

//#endregion CONFIGURACION SERVER