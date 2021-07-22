class BaseKnex {
    constructor(credentials) {
        console.log('[Knex] - Conectado en:', JSON.stringify(credentials));
        this.knex = require('knex')(credentials);
    }

    connect() {
        this.knex.schema.createTable('carros', table => {
            table.increments('id');
            table.string('producto');
            table.timestamp('timestamp', { useTz: true }).notNullable().defaultTo(this.knex.fn.now());
        }).then(() => {
            console.log('tabla carros creada!');
        }).catch(error => {
            console.log('error:', error.sqlMessage || 'Tabla carros ya existe');
            return;
        }).then(() => {
            return this.knex.schema.createTable('productos', table => {
                table.increments('id');
                table.string('titulo');
                table.string('descripcion');
                table.string('codigo');
                table.integer('precio');
                table.integer('stock');
                table.string('foto_url');
                table.timestamp('timestamp', { useTz: true }).notNullable().defaultTo(this.knex.fn.now())
            });
        }).then(() => {
            console.log('tabla productos creada!');
        }).catch(error => {
            console.log('error:', error.sqlMessage || 'Tabla productos ya existe');
        });
    }

    async create(tabla, contenido) {
        try {
            const response = await this.knex(tabla).insert(contenido);
            return Boolean(response[0])
        } catch (error) {
            throw error;
        }
    }

    async read(tabla, llave = null, valor = null, query = null) {
        try {
            if (llave && valor) {
                const response = await this.knex(tabla).where(llave, valor);
                return response;
            }
            if (query) {
                console.log('[Knex] - Se aplica siguiente filtro', query);
                return this.getBuilderWithQuery(tabla, query)
            }
            return await this.knex(tabla);
        } catch (error) {
            throw error;
        }
    }

    async update(tabla, llave, valor, nuevoContenido) {
        try {
            const response = await this.knex(tabla).where(llave, valor).update(nuevoContenido);
            return { ok: response };
        } catch (error) {
            throw error;
        }
    }

    async delete(tabla, llave, valor) {
        try {
            const response = await this.knex(tabla).where(llave, valor).del();
            return { deletedCount: response };
        } catch (error) {
            throw error;
        }
    }

    getBuilderWithQuery(tabla, queries) {
        const builder = this.knex(tabla);
        for (const key in queries) {
            if (Object.hasOwnProperty.call(queries, key)) {
                const value = queries[key];
                if(String(key).includes('_')) {
                    const implicitKey = String(key).split('_')[0]
                    const filter = String(key).split('_')[1]
                    let operator = ''
                    switch (filter) {
                        case 'gte':
                            operator = '>='
                            break;
                        case 'gt':
                            operator = '>'
                            break;
                        case 'lte':
                            operator = '<='
                            break;
                        case 'lt':
                            operator = '<'
                            break;
                    }
                    builder.whereRaw(`${implicitKey} ${operator} ${value}`)
                } else {
                    builder.whereRaw(`${key} = ${value}`)
                }
            }
        }
        return builder;
    }
}

module.exports = BaseKnex;