
class PersistenceFactory {
    constructor() { }
    getPersistence(type) {
        try {
            let module = null;
            switch (type) {
                case 1:
                    console.log('[Persistence factory] - Conectando a MySQL Local');
                    module = require(`./persistence/mysql.local`);
                    break;
                case 2:
                    console.log('[Persistence factory] - Conectando a SQLite Local');
                    module = require(`./persistence/sqlite.local`);
                    break;
                case 3:
                    console.log('[Persistence factory] - Conectando a Mongo Local');
                    module = require(`./persistence/mongo.local`);
                    break;
                case 4:
                    console.log('[Persistence factory] - Conectando a Mongo DBaaS');
                    module = require(`./persistence/mongo.dbaas`);
                    break;
            }
            return module;
        } catch (error) {
            console.log('[Persistence factory] - No se encontro el tipo de persistencia:', error);
        }
    }
}

module.exports = new PersistenceFactory();