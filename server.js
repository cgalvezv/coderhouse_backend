//Desafío 25- Cookies y sesión (parte 2)
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
require('dotenv').config();
const controller = require('./src/api/mensajes');
const config = require('./src/config/config.json');
const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

require('./src/database/connection');


let messages = [];
let products = [];

const puerto = process.env.PORT || config.PORT;

const MongoStore = require('connect-mongo');
const advancedOptions = {
    useNewUrlParser: true, useUnifiedTopology: true
}

// Configuraciones para Express
app.use(express.static('./public'));
app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000 // 10 min de duración de la sesión
    }
}))

//#region LOGICA ROUTER
const routerProductos = require('./src/routes/productos');
app.use('/api/productos', routerProductos);
//#endregion


//#region MANEJO LOGIN
app.get('/login', (req,res) => {
    if(req.session.nombre) {
        res.render('home', {
            nombre: req.session.nombre
        })
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
})

app.post('/login', (req,res) => {
    let { nombre } = req.body
    req.session.nombre = nombre
    res.redirect('/')
})

app.get('/logout', (req,res) => {
    let nombre = req.session.nombre;
    if(nombre) {
        req.session.destroy( err => {
            if(!err) res.render('logout', { nombre })
            else res.redirect('/')
        })
    }
    else {
        res.redirect('/')
    }
})
//#endregion


//#region MANEJO SOCKETS
io.on('connection', async (socket) => {
    const responseProducts = await fetch(`http://localhost:${puerto}/api/productos/listar`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });
    products = await responseProducts.json();
    io.sockets.emit('productos', products)
    socket.on('update', async (isOK) => {
        if (isOK) {
            const responseProducts = await fetch(`http://localhost:${puerto}/api/productos/listar`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });
            products = await responseProducts.json();
            io.sockets.emit('productos', products)
        }
    })

    messages = await controller.getAll();
    io.sockets.emit('messages', messages);
    socket.on('new-message', async (msj) => {
        await controller.create(msj)
        messages = await controller.getAll();
        io.sockets.emit('messages', messages);
    })
});
//#endregion

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});