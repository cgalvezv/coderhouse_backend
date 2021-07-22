const BaseKnex = require('./knex.base');
class LocalSQLite extends BaseKnex {
    constructor() {
        const db_path = process.env.SQLITE_LOCAL_PATH || '/../files/coderhouse_final_project.sqlite';
        const credentials = { 
            client: 'sqlite3',
            connection: {
                filename: __dirname + db_path
            },
            useNullAsDefault: true
        }
        super(credentials)
    }
}

module.exports = LocalSQLite;