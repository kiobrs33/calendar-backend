const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe!'
            });
        }

        user = new UserModel(req.body);

        //Encriptando Contraseña
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar TOKEN DE SESION
        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado!',
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede crear el usuario',
        })
    }
}

const loginUser = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe!'
            });
        }

        //Validando Contraseña
        const validatePassword = bcrypt.compareSync(password, user.password);
        
        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta!'
            });
        }

        //Generar TOKEN DE SESION
        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error en el server',
        })
    }
}

const revalidateToken = async (req, res = response) => {

    //Generar TOKEN DE SESION
    const token = await generateJWT(req.uid, req.name);

    res.json({
        ok: true,
        msg: 'Revalidate Token',
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}