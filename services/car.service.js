const Car = require('../model/car.model');

const createCar = async(carData) => {
    const car = new Car(carData);
    await car.save();
    return car;
};

const getCar = async() => {
    return await Car.find({}, 'name brand model year engine transmission color countryOfOrigin description');
};

const deleteCar = async(carId) => {
    return await Car.deleteOne({ _id: carId });
};

const getCarByBrand = async(brand) => {
    return await Car.find({ brand: brand }, 'name brand model year engine transmission color countryOfOrigin description')
                    .sort({ brand: 1, year: -1 });
};

const getCarByYear = async(year) => {
    return await Car.find({ year: year }, 'name brand model year engine transmission color countryOfOrigin description')
}

const updateCar = async (carId, updateData) => {
    return await Car.findByIdAndUpdate(carId, updateData, { new: true });
};

module.exports = {createCar, getCar, deleteCar, getCarByBrand, getCarByYear, updateCar};