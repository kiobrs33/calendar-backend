const { response } = require('express');
const { validationResult } = require('express-validator');

//Parámetro NEXT, pasa a la siguiente FUNCION

const validateFields = (req, res = response, next) => {
    //Validacion de campos
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next();
}

module.exports = {
    validateFields
}