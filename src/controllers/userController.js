const User = require('../models/User');
const expressJoi = require('express-joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Joi = expressJoi.Joi;

// Validate register of fields
const registerUserSchema = {
    username: expressJoi.Joi.types.String().alphanum().min(6).max(255).required(),
    name: expressJoi.Joi.types.String().alphanum().min(6).max(255).required(),
    email: expressJoi.Joi.types.String().alphanum().min(6).max(1024).required(),
    password: expressJoi.Joi.types.String().alphanum().min(6).max(1024).required()
}

// Validate login of fields
const loginUserSchema = {
    email: expressJoi.Joi.types.String().alphanum().min(6).max(1).required().email(),
    password: expressJoi.Joi.types.String().alphanum().min(6).max(1024).required()
}

// Method protect for user not registered
exports.dashboard = (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'Ruta para usuarios registrados',
            user: req.user
        }
    })
};

// Method for register 
exports.register = async (req, res) => {
    // Destructuring data
    const { usernam, name, email, password } = req.body;

    // User validate
    const { validateError } = expressJoi.joiValidate(registerUserSchema);

    if(validateError) {
        return res.status(400).json({
            message: 'Verifique sus datos, no pudimos registrar al usuario...',
            data: null
        })
    }

    // Question if exist email
    const emailExist = await User.findOne({
        email,
    });

    if(emailExist) {
        return res.status(400).json({
            message: 'Error. El email con el que trata de registrarse ya esta en uso...',
            data: null
        })
    }

    // Encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
        username,
        name,
        email,
        hashingPassword: password
    });

    try {
        const savedUser = await user.save();

        res.status(200).json({
            error: null,
            data: {
                savedUser
            }
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: message.error,
            message: 'Error al intentar registar al usaurio'
        })
    }
};

// Method login
exports.login = async (req, res) => {
    // Destructuring data
    const { email, password } = req.body;

    // Validate fields login
    const { validateLoginError } = expressJoi.joiValidate(loginUserSchema);

    if(validateLoginError) {
        return res.status(400).json({
            message: 'Verifica Email/password que sean correctos',
            data: null
        })
    }

    // validate email not exist
    const user = await User.findOne({
        email,
    })

    if(!user) {
        return res.status(400).json({
            message: 'No se encontro ningun usuario registrado con ese email',
        })
    }

    // validate password
    const validatePassword = await bcrypt.compare(password, user.hashingPassword);

    if(!validatePassword) {
        return res.status(400).json({
            message: 'Contraseña no valida',
        })
    }

    // create token
    const token = jwt.sign({
        username: username,
        name: user.name,
        email: user.email,
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, process.env.TOKEN_SECRET)

    res.header('authentication-token', token).json({
        error: null,
        data: {
            token,
            message: 'Sesión iniciada correctamente!!'
        }
    })
};