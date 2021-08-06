
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: String,
    password: String
})

const Usuario = mongoose.model('usuarios', schema);

module.exports = Usuario;