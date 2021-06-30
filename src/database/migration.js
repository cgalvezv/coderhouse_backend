const knex = require('./knex');

knex.sqlite3.schema.createTable('mensajes', table => {
    table.increments('id');
    table.string('mensaje');
    table.string('email');
    table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.sqlite3.fn.now());
}).then(() => {
    console.log('tabla mensajes creada!');
}).catch(error => {
    console.log('error:', error);
    throw error;
}).then(() => {
    return knex.mysql.schema.createTable('productos', table => {
        table.increments('id');
        table.string('title');
        table.string('price');
        table.string('thumbnail');
        table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.mysql.fn.now())
    });
}).then(() => {
    console.log('tabla productos creada!');
}).catch(error => {
    console.log('error:', error);
    throw error;
}).finally(() => {
    console.log('cerrando conexion...');
    process.exit(0);
});