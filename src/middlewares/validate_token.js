const jwt = require('jsonwebtoken');

// Middleware para validar que el usuario que este ingresando tenga un token
const verifyTokenUser = (req, res, next) => {
    const token = req.header('authentication-token');

    if(!token) {
        return res.status(401).json({
            error: 'Acceso denegado',
        })
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken;

        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: 'Token no valida...'
        })
    }
};

module.exports = verifyTokenUser;