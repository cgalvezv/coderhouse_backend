const faker = require('faker');
faker.locale = 'es'

const getFake = () => ({
    nombre: faker.name.findName(),
    precio: faker.commerce.price(),
    foto: faker.image.business()
})

module.exports = {
    getFake
}