const mongoose = require('mongoose');

class BaseMongoDB {
    constructor(url) {
        this.url = url;

        this.connection = mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });

        this.schemas = require('../schemas/mongo.schemas');
    }

    connect() {
        mongoose.connection.on('connected', () => {
            console.log('[Mongoose] - Conectado en:', this.url);
        });

        mongoose.connection.on('error', (err) => {
            console.log('[Mongoose] - error:', err);
        });

    }

    async create(tabla, contenido) {
        try {
            const schema = this.schemas[tabla];
            return schema.create(contenido);
        } catch (error) {
            return false;
        }
    }

    async read(tabla, llave = null, valor = null, query = null) {
        try {
            const schema = this.schemas[tabla];
            if (llave && valor) {
                if (llave === 'id') llave = '_id'
                const response = await schema.findOne({ [llave]: valor })
                if (!response) return [];
                return response;
            }
            let filters = {}
            if (query) {
                filters = this.mappingQueryToFilters(query)
                console.log('[Mongoose] - Se aplica siguiente filtro', filters);
            }
            return await schema.find(filters);
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async update(tabla, llave, valor, nuevoContenido) {
        try {
            if (llave === 'id') llave = '_id'
            const schema = this.schemas[tabla];
            return await schema.updateOne({ [llave]: valor}, nuevoContenido);
        } catch (error) {
            return false;
        }
    }

    async delete(tabla, llave, valor) {
        try {
            if (llave === 'id') llave = '_id'
            const schema = this.schemas[tabla];
            return await schema.deleteOne({ [llave]: valor });
        } catch (error) {
            return false;
        }
    }

    mappingQueryToFilters(queries) {
        const response = {}
        for (const key in queries) {
            if (Object.hasOwnProperty.call(queries, key)) {
                const value = queries[key];
                if(String(key).includes('_')) {
                    const implicitKey = String(key).split('_')[0]
                    const filter = String(key).split('_')[1]
                    if (implicitKey in response) {
                        response[implicitKey][`$${filter}`] = Number(value)
                    } else {
                        response[implicitKey] = { [`$${filter}`]: Number(value) }
                    }
                } else {
                    response[key] = { '$eq' : value }
                }
            }
        }
        return response;
    }
}

module.exports = BaseMongoDB;