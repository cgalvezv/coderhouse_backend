//Desafío 31 - Logger Parte 1
//author: Camilo Gálvez Vidal
const express = require('express');
const compression = require('compression');
const app = express();
// Lógica de compresión GZip
// app.use(compression());
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const MongoStore = require('connect-mongo');
const http = require('http').Server(app);
const { fork } = require('child_process');
const io = require('socket.io')(http);
const cluster = require('cluster')
const controller = require('./src/api/mensajes');
const log4js = require('log4js');
require('dotenv').config();
require('./src/database/connection');
const config = require('./src/config/config.json');
const numCPUs = require('os').cpus().length
const CON_CHILD_PROCESS_FORK = !false


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
    //#region MANEJO DE LOGIN
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
    //#endregion
    
    //#region MANEJO DE LOGGER
    log4js.configure({
        appenders: {
            logConsole: { type: 'console' },
            logFileWarn: { type: 'file', filename: 'warn.log' },
            logFileError: { type: 'file', filename: 'error.log' }
        },
        categories: {
            default: { appenders: ['logConsole'], level: 'trace' },
            info: { appenders: ['logConsole'], level: 'info' },
            warn: { appenders: ['logFileWarn'], level: 'warn' },
            error: { appenders: ['logFileError'], level: 'error' }
        }
    });
    const loggerInfo = log4js.getLogger('info');
    const loggerWarn = log4js.getLogger('warn');
    const loggerError = log4js.getLogger('error');
    //#endregion
    
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
            loggerWarn.warn(`Sesión ya iniciada!!!`)
            loggerInfo.info('Re-dirigiendo al home...')
            res.render("home", {
                nombre: req.user.displayName,
                foto: req.user.photos[0].value,
                email: req.user.emails[0].value      
            })
        }
        else {
            loggerInfo.info('Re-dirigiendo al inicio de sesión...')
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
    
    if(CON_CHILD_PROCESS_FORK) {
        let calculo = fork('./src/utils/random.js');

        var taskId = 0;
        var tasks = {};

        function addTask(data, callback) {
            var id = taskId++;
            calculo.send({id: id, data: data});
            tasks[id] = callback;
        };

        calculo.on('message', function(message) {
            tasks[message.id](message);
        });
        
        app.get('/randoms', async (req,res) => {
            addTask(req.query.cant || 100000000, randoms => {
                res.json(randoms)
            });
        })
    }
    else {
        app.get('/randoms', async (req,res) => {
            loggerWarn.warn(`Randoms no implementado!!!`)
            res.send('<h2 style="color: orangered;">randoms -> no implementado!</h2>')
        })
    }
    
    app.get('/faillogin', (req,res) => {
        loggerError.error('Error de Login!!!')
        res.render('login-error', {});
    })
    
    app.get('/logout', (req,res) => {
        let nombre = req.user.displayName
        req.logout()
        loggerInfo.info('Cerrando sesión...')
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
    // pongo a escuchar el servidor en el puerto indicado
    const server = http.listen(puerto, () => {
        console.log(`servidor escuchando en http://localhost:${puerto}`);
    });
    // en caso de error, avisar
    server.on('error', error => {
        console.log('error en el servidor:', error);
    });
}

