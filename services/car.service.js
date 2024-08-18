const Car = require('../model/car.model');

const createCar = async(carData) => {
    const car = new Car(carData);
    await car.save();
    return car;
};

const createCars = async(carData) => {
    const car = new Car(carData);
    await car.insertMany();
    return car;
}

const getCar = async() => {
    return await Car.find({}, 'name brand model year engine transmission color countryOfOrigin description');
};

const deleteCar = async(carId) => {
    return await Car.deleteOne({ _id: carId });
};

const getCarByBrand = async() => {
    return await Car.find({}, 'name brand model year engine transmission color countryOfOrigin description').sort({ brand: 1, year: -1 });
}



module.exports = {createCar, createCars, getCar, deleteCar, getCarByBrand};