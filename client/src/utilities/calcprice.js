const brandPrices = {
    Toyota: 20000,
    Honda: 18000,
    Ford: 22000,
    Chevrolet: 21000,
    BMW: 45000,
}

const wheelPrices = {
    Alloy: 1500,
    Steel: 500,
}

const colorPrices = {
    White: 0,
    Black: 300,
    Silver: 200,
    Red: 500,
    Blue: 400,
}

const calcCost = ({ brand, wheel, color }) => {
    const brandBase = brandPrices[brand] ?? 15000
    const wheelCost = wheelPrices[wheel] ?? 750
    const colorCost = colorPrices[color] ?? 250
    return brandBase + wheelCost + colorCost
}

const brandOptions = Object.keys(brandPrices)
const wheelOptions = Object.keys(wheelPrices)
const colorOptions = Object.keys(colorPrices)

const incompatibleWheels = {
    BMW: ['Steel'],
}

const validateCar = ({ brand, wheel }) => {
    if (incompatibleWheels[brand]?.includes(wheel)) {
        return `${brand} vehicles cannot be configured with ${wheel} wheels.`
    }
    return null
}

const getDisabledWheels = (brand) => incompatibleWheels[brand] || []

export { calcCost, brandOptions, wheelOptions, colorOptions, validateCar, getDisabledWheels }
