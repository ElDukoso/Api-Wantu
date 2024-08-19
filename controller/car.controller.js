const { response } = require('express');
const { createCar, getCar, deleteCar, getCarByBrand } = require('../services/car.service');

const createCarController = async (req, res = response) => {
    try {
        const car = await createCar(req.body);
        res.status(201).json({
            msg: true,
            car
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                ok: false,
                msg: 'El auto ya existe en la base de datos.'
            });
        } else {
            res.status(500).json({
                ok: false,
                mgs: 'create car failed'
            });
        };
    };
};

const createCarsController = async (req, res = response) => {
    try {
        const cars = req.body;
        for (const car of cars) {
            await createCar(car);
        }
        res.status(201).json({
            ok: true,
            cars
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                ok: false,
                msg: 'Uno de los vehículos ya existe en la base de datos.'
            });
        } else {
            res.status(500).json({
                ok: false,
                mgs: 'create car failed'
            });
        };
    };
};

const getCarController = async (req, res = response) => {
    try {
        const cars = await getCar();
        res.status(200).json({
            ok: true,
            cars
        });
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Get cars failed'
        });
    };
};

const deleteCarController = async (req, res = response) => {
    try {
        const { id } = req.params;
        const result = await deleteCar(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un auto con ese ID'
            });
        };
        res.status(200).json({
            ok: true,
            msg: 'Succeful Car delete'
        });
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'error to delete car'
        });
    };
};

const getCarByBrandController = async (req, res = response) => {
    try {
        const { brand } = req.params;
        const cars = await getCarByBrand(brand);
        if (cars.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se han encontrado vehículos con esa marca'
            });
        };
        res.status(200).json({
            ok: true,
            cars
        });
        
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se han encontrado vehiculos con esa marca'
        });
    };
};

module.exports = { createCarController, createCarsController, getCarController, deleteCarController, getCarByBrandController };