const mongoose = require('mongoose');

const schema = mongoose.Schema({
    mensaje: { type: String, max: 500 },
    email: { type: String, require: true, max: 100 },
    fecha: { type: Date, default: new Date() }
})

const Mensaje = mongoose.model('mensajes', schema);

module.exports = Mensaje;