const options = require('./../config/database');
const sqlite3 = require('knex')(options.sqlite3);
const mysql = require('knex')(options.mysql);

// exporto el objeto para usarlo en otros modulos
module.exports = {
    sqlite3,
    mysql
};