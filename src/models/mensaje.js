const mongoose = require('mongoose');

const schema = mongoose.Schema({
    texto: { type: String, max: 500 },
    email: { type: String, require: true, max: 100 },
    nombre: { type: String, require: true, max: 100 },
    apellido: { type: String, require: true, max: 100 },
    edad: { type: Number, require: true },
    alias: { type: String, require: true, max: 100 },
    avatar: { type: String, require: true, max: 100 },
    fecha: { type: Date, default: new Date() }
})

const Mensaje = mongoose.model('mensajes', schema);

module.exports = Mensaje;