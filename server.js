'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//Desafío 14 - Transpiladores
//author: Camilo Gálvez Vidal
require('babel-polyfill');
var express = require('express');
var app = express();

var http = require('http').Server(app);
// le pasamos la constante http a socket.io
var io = require('socket.io')(http);

// Clase para persistir mensaje en un archivo
var Archivo = require('./src/classes/archivo');

// indicamos donde se encuentran los archivos estaticos
app.use(express.static('./public'));

var productos = [];

// Instancio el archivo para guardar los mensajes
var msgFile = new Archivo('./src/database/mensajes.txt');
var messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
var puerto = 8080;

app.get('/', function (req, res) {
    res.sendFile('index', { root: __dirname });
});

// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(socket) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        io.sockets.emit('productos', productos);
                        socket.on('productoSocket', function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                                var title = _ref2.title,
                                    price = _ref2.price,
                                    thumbnail = _ref2.thumbnail;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                productos.push({ id: socket.id, title: title, price: price, thumbnail: thumbnail });
                                                io.sockets.emit('productos', productos);

                                            case 2:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x2) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

                        io.sockets.emit('messages', messages);
                        socket.on('new-message', function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
                                var author = _ref4.author,
                                    fyh = _ref4.fyh,
                                    text = _ref4.text;
                                var newMessage;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                newMessage = { id: socket.id, author: author, fyh: fyh, text: text };
                                                _context2.next = 3;
                                                return msgFile.guardar(newMessage);

                                            case 3:
                                                // Guardo en archivo de texto
                                                messages.push(newMessage);
                                                io.sockets.emit('messages', messages);

                                            case 5:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x3) {
                                return _ref5.apply(this, arguments);
                            };
                        }());

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

var server = http.listen(puerto, function () {
    console.log('servidor escuchando en http://localhost:' + puerto);
});

// en caso de error, avisar
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
