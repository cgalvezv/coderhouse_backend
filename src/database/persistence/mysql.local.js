const BaseKnex = require('./knex.base');
class LocalMySQL extends BaseKnex {
    constructor() {
        const credentials = { 
            client: 'mysql',
            connection: {
                host: process.env.MYSQL_LOCAL_HOST || '127.0.0.1',
                user: process.env.MYSQL_LOCAL_USER || 'root',
                password: process.env.MYSQL_LOCAL_PASSWORD || '',
                database: process.env.DATABASE_NAME || 'coderhouse_final_project'
            },
            pool: { min: 0, max: 7 }
        }
        super(credentials)
    }
}

module.exports = LocalMySQL;