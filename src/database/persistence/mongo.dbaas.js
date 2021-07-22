const BaseMongoDB = require('./mongo.base');

class DBaaSMongoDB extends BaseMongoDB{
    constructor() {
        const host = process.env.MONGO_DBAAS_HOST || 'coderhouse.smk1t.mongodb.net';
        const user = process.env.MONGO_DBAAS_USER || 'cgalvezv';
        const pass = process.env.MONGO_DBAAS_PASSWORD || '123123123';
        const database = process.env.DATABASE_NAME || 'coderhouse_final_project';
        super(`mongodb+srv://${user}:${pass}@${host}/${database}`)
    }
}

module.exports = DBaaSMongoDB;