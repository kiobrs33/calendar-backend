const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

//Middleware Personalizado
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.use( validarJWT );

router.get('/', getEvents);

router.post(
    '/', 
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es requerido').custom(isDate),
        check('end', 'Fecha final es requerido').custom(isDate),
        validateFields
    ],
    createEvent
);
router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;