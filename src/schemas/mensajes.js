const normalizr = require('normalizr');
const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'email'});

const schemaMensaje = new normalizr.schema.Entity('post', {
    author: schemaAuthor
},{idAttribute: '_id'});

const schemaMensajes = new normalizr.schema.Entity('posts', {
  mensajes: [schemaMensaje]
},{idAttribute: 'id'});

module.exports = schemaMensajes;