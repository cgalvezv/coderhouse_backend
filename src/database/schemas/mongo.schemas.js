const mongoose = require('mongoose');

const schemaProducto = mongoose.Schema({
    titulo: { type: mongoose.SchemaTypes.String, require: true, max: 100 },
    descripcion: { type: mongoose.SchemaTypes.String, max: 100 },
    codigo: { type: mongoose.SchemaTypes.String, max: 100 },
    precio: { type: mongoose.SchemaTypes.Number, require: true },
    stock: { type: mongoose.SchemaTypes.Number, default: 0 },
    foto_url: { type: mongoose.SchemaTypes.String, require: true },
    timestamp: { type: mongoose.SchemaTypes.Date, default: new Date() }
});

const schemaCarro = mongoose.Schema({
    producto: { type: mongoose.SchemaTypes.String, require: true },
    timestamp: { type: mongoose.SchemaTypes.Date, default: new Date() }
});

const Producto = mongoose.model('productos', schemaProducto);
const CarroItem = mongoose.model('carros', schemaCarro);

module.exports = {
    productos: Producto,
    carros: CarroItem
};