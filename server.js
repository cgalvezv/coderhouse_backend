//Desafío 28 - Global process y Child process
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const MongoStore = require('connect-mongo');
require('dotenv').config();
const controller = require('./src/api/mensajes');
const config = require('./src/config/config.json');
const http = require('http').Server(app);
const { fork } = require('child_process');
const io = require('socket.io')(http);
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
require('./src/database/connection');


let messages = [];
let products = [];

let puerto = process.env.PORT || config.PORT;
let facebookClientID = process.env.FACEBOOK_CLIENT_ID
let facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET
let modoEjecucion = 'FORK';

//#region MANEJO DE ARGS
console.log('ARGS recibidos!')
process.argv.forEach((arg, index) => {
    console.log(index + ' -> ' + arg)
    if (String(arg).toUpperCase().includes('PORT')) puerto = Number(String(arg).split('=')[1]);
    if (String(arg).toUpperCase().includes('FACEBOOK_CLIENT_ID')) facebookClientID = String(arg).split('=')[1];
    if (String(arg).toUpperCase().includes('FACEBOOK_CLIENT_SECRET')) facebookClientSecret = String(arg).split('=')[1];
    if (String(arg).toUpperCase().includes('CLUSTER')) modoEjecucion = String(arg);
});

//#endregion
passport.use(new FacebookStrategy({
  clientID: facebookClientID,
  clientSecret: facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function(accessToken, refreshToken, profile, done) {
    let userProfile = profile;
    return done(null, userProfile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

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
app.use(passport.initialize());
app.use(passport.session());

//#region LOGICA ROUTER
const routerProductos = require('./src/routes/productos');
app.use('/api/productos', routerProductos);
//#endregion


//#region MANEJO LOGIN
// Vistas y llamadas para página login con Facebook
app.get('/login', (req,res) => {
    if(req.isAuthenticated()){
        res.render("home", {
          nombre: req.user.displayName,
          foto: req.user.photos[0].value,
          email: req.user.emails[0].value      
        })
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
})

app.get('/info', (req,res) => {
    // Argumentos de entrada
    const args = JSON.stringify(process.argv);
    // Nombre de plataforma (Sistema operativo)
    const so = process.platform;
    // Versión de NodeJS
    const vNode = process.version;
    // Uso de memoria
    const memory = JSON.stringify(process.memoryUsage(), null, 2);
    // Path de ejecución
    const pathExec = process.execPath;
    // Process ID
    const processID = process.pid;
    // Carpeta corriente
    const cwd = process.cwd();
    res.render("info", { args, so, vNode, memory, pathExec, processID, cwd, numCPUs })
})

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/home', 
    failureRedirect: '/faillogin' }
));

app.get('/home', (req,res) => {
   res.redirect('/')        
})
app.get('/randoms', (req,res) => {
    const lenRandoms = req.query.cant || 100000000
    const random = fork('./src/utils/random.js')
    random.send('start');
    random.send({ lenRandoms });
    random.on('message', array => {
        res.end(`${JSON.stringify(array)}`)
    })      
})

app.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

app.get('/logout', (req,res) => {
    let nombre = req.user.displayName
    req.logout()
    res.render("logout", { nombre })
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

if (modoEjecucion === 'CLUSTER') {
    /* MASTER */
    if(cluster.isMaster) {
        console.log(`Número de procesadores presentes: ${numCPUs}`)
        console.log(`PID MASTER ${process.pid}`)

        for(let i=0; i<numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    }
    /* WORKERS */
    else {
        // pongo a escuchar el servidor en el puerto indicado
        const server = http.listen(puerto, err => {
            if(!err) console.log(`servidor escuchando en http://localhost:${puerto} - PID WORKER ${process.pid}`)
        })
        // en caso de error, avisar
        server.on('error', error => {
            console.log('error en el servidor:', error);
        });
    }
} else {
    // pongo a escuchar el servidor en el puerto indicado
    const server = http.listen(puerto, () => {
        console.log(`servidor escuchando en http://localhost:${puerto}`);
    });
    // en caso de error, avisar
    server.on('error', error => {
        console.log('error en el servidor:', error);
    });
}

