//Método para manejar la utilización de un recurso, si este es utilizado por el administrador
const isAdmin = (req, res, next) => {
    console.log(req.body.administrador)
    if (req.body.administrador !== 'true' && !req.body.administrador) {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` });
    }
    next();
}

module.exports = {
    isAdmin
}
