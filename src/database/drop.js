
const knex = require('./knex');

knex.sqlite3.schema.dropTable('mensajes').then(() => {
    console.log('Tabla mensajes borrada!')
}).catch(error => {
    console.log('error:', error);
    throw error;
}).then(() => knex.mysql.schema.dropTable('productos')).then(() => {
    console.log('Tabla productos borrada!')
}).catch(error => {
    console.log('error:', error);
    throw error;
}).finally(() => {
    console.log('cerrando conexion...');
    process.exit(0);
});;