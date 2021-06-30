const sqlite3 = { 
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/mydb.sqlite'
    },
    useNullAsDefault: true
}
console.log(process.env)
const mysql = { 
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '', // TODO: Utilizar clave local para la DB
        database: process.env.MYSQL_DATABASE || 'test'    // TODO: Crear database test si no existe
    },
    pool: { min: 0, max: 7 }
}

module.exports = {
    sqlite3,
    mysql
};