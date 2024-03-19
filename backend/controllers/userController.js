const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER USER
//POST: api/users/register
//UNPROTECTED
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        if (!name || !email || !password) {
            return next(new HttpError('Debes llenar todos los campos.', 422));
        }
        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email: newEmail});
        if (emailExists) {
            return next(new HttpError('El correo ya existe.', 422));
        }

        if (password.trim().length < 6) {
            return next(new HttpError('La contraseña debe tener al menos 6 caracteres.', 422));
        }

        if (password != password2) {
            return next(new HttpError('Las contraseñas no coinciden.', 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPass,
        });

        res.status(201).json(`Nuevo usuario: ${newUser.email} registrado.`);

    } catch (error) {
        return next(new HttpError('El registro falló.', 422));
    }
}

// LOGIN USER
// POST: api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new HttpError('Llena todos los campos.', 422));
        }
        const newEmail = email.toLowerCase();
        const user = await User.findOne({email: newEmail});

        if (!user) {
            return next(new HttpError('Credenciales inválidas.', 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return next(new HttpError('Credenciales inválidas.', 422));
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({token, id, name});

    } catch (error) {
        return next(new HttpError('El inicio falló. Por favor revisa tus credenciales.', 422));
    }
}

// USER PROFILE
// GET: api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError('Usuario no encontrado.', 404));
        }

        res.status(200).json(user);

    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}
