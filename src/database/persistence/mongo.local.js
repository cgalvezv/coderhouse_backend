const BaseMongoDB = require('./mongo.base');

class LocalMongoDB extends BaseMongoDB{
    constructor() {
        const host = process.env.MONGO_LOCAL_HOST || 'localhost';
        const port = process.env.MONGO_LOCAL_PORT || '27017';
        const database = process.env.DATABASE_NAME || 'coderhouse_final_project';
        super(`mongodb://${host}:${port}/${database}`)
    }
}

module.exports = LocalMongoDB;