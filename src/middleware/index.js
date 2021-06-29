const authMiddleware = require('./auth');
module.exports = {
    auth: {
        isAdmin: authMiddleware.isAdmin
    }
}