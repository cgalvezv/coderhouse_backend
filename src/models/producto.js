const mongoose = require('mongoose');


const schema = mongoose.Schema({
    nombre: { type: mongoose.SchemaTypes.String, require: true, max: 100 },
    categoria: { type: mongoose.SchemaTypes.String, max: 100 },
    precio: { type: mongoose.SchemaTypes.Number, require: true },
    stock: { type: mongoose.SchemaTypes.Number, default: 0 },
    url: { type: mongoose.SchemaTypes.String, require: true },
    fecha: { type: mongoose.SchemaTypes.Date, default: new Date() }
})

const Producto = mongoose.model('productos', schema);

module.exports = Producto;