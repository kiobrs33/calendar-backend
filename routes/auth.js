const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');

//Middleware Personalizado
const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
    ],
    validateFields,
    createUser
);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({min: 6}),
        validateFields,
    ],
    loginUser
);

router.get('/revalidate', validarJWT , revalidateToken);

module.exports = router;