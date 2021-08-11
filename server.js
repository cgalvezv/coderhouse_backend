//Desafío 27 - Autorización y autentificación (parte 2)
//author: Camilo Gálvez Vidal
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bCrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;
const MongoStore = require('connect-mongo');
require('dotenv').config();
const controller = require('./src/api/mensajes');
const config = require('./src/config/config.json');
const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);
const Usuario = require('./src/models/usuario');
require('./src/database/connection');


let messages = [];
let products = [];

const puerto = process.env.PORT || config.PORT;
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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

// passport.use('login', new LocalStrategy({
//     passReqToCallback : true
//   },
//   (req, username, password, done) => { 
//     Usuario.findOne(
//         { 
//             'username' : username 
//         }, (err, user) => {
//             if (err) return done(err);
//             if (!user){
//                 console.log(`Usuario ${username} no existe en la DB`);           
//                 return done(null, false)
//             }
            
//             if (!isValidPassword(user, password)){
//                 console.log('Contraseña invalida');
//                 return done(null, false) 
//             }
//             return done(null, user);
//         }
//     );
//   })
// );

// const isValidPassword = function(usuario, password){
//   return bCrypt.compareSync(password, usuario.password);
// }

// passport.use('register', new LocalStrategy({
//     passReqToCallback : true
//   },
//   (req, username, password, done) => {
//     const findOrCreateUser = () => {
//       Usuario.findOne({
//           'username': username
//         }, (err, user) => {
//             if (err){
//                 console.log(`Error en registrar: ${err}`);
//                 return done(err);
//             }
            
//             if (user) { // Usuario ya existe
//             console.log('Usuario ya existe en la DB');
//             return done(null, false)
//             } else { // creo nuevo usuario
//                 var newUser = new Usuario();
//                 newUser.username = username;
//                 newUser.password = createHash(password);

//                 newUser.save((err) => {
//                     if (err) {
//                     console.log(`Error al registrar el usuario: ${err}`);  
//                     throw err;  
//                     }
//                     console.log('Usuario registrado exitosamente!');    
//                     return done(null, newUser);
//                 });
//             }
//         }
//       );
//     }
//     process.nextTick(findOrCreateUser);
//   })
// )
//   // Hashea el password
// const createHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

// // serializa el usuario
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });
 
// // deserializa el usuario
// passport.deserializeUser(function(id, done) {
//   Usuario.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
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

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/home', 
    failureRedirect: '/faillogin' }
));

app.get('/home', (req,res) => {
   res.redirect('/')        
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

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});