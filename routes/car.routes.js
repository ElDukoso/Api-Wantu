const { Router } = require('express');
const { check, param } = require('express-validator');
const { createCarController, 
        createCarsController, 
        getCarController, 
        deleteCarController, 
        getCarByBrandController, 
        getCarByYearController,
        updateCarController
       } = require('../controller/car.controller');


const validateFields = require('../middelware/validate-field');

const router = Router();

router.post(
    '/',
    [
        check('name', 'El nombre del auto es obligatorio').not().isEmpty(),
        check('brand', 'La marca es obligatoria').not().isEmpty(),
        check('model', 'El modelo es obligatorio').not().isEmpty(),
        check('year', 'El año es obligatorio y debe ser un número válido').isInt({ min: 1886 }),
        check('engine', 'El tipo de motor es obligatorio').not().isEmpty(),
        check('transmission', 'La transmisión es obligatoria').not().isEmpty(),
        check('color', 'El color es obligatorio').not().isEmpty(),
        check('countryOfOrigin', 'El país de origen es obligatorio').not().isEmpty(),
        validateFields
    ],
    createCarController
);

router.post(
    '/bulk',
    [
        // Define validaciones para un solo objeto de vehículos
        check('*.name', 'El nombre del auto es obligatorio').not().isEmpty(),
        check('*.brand', 'La marca es obligatoria').not().isEmpty(),
        check('*.model', 'El modelo es obligatorio').not().isEmpty(),
        check('*.year', 'El año es obligatorio y debe ser un número válido').isInt({ min: 1886 }),
        check('*.engine', 'El tipo de motor es obligatorio').not().isEmpty(),
        check('*.transmission', 'La transmisión es obligatoria').not().isEmpty(),
        check('*.color', 'El color es obligatorio').not().isEmpty(),
        check('*.countryOfOrigin', 'El país de origen es obligatorio').not().isEmpty(),
        validateFields
    ],
    createCarsController
);

router.get('/', getCarController);

router.get('/brand/:brand', getCarByBrandController);

router.get('/year/:year', getCarByYearController);

router.delete(
    '/:id',
    [
        param('id', 'Debe ingresar el id del auto para eliminar').not().isEmpty(),
        validateFields
    ],
    deleteCarController
);

router.patch(
    '/',
    [
        check('id', 'El ID es obligatorio para actualizar un vehículo').not().isEmpty(),
        validateFields
    ],
    updateCarController
)
module.exports = router;