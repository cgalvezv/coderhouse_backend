class CarroItem {
    constructor(id) {
        this.id = id;
        this.producto = null;
        this.timestamp = Date.now();
    }
}

module.exports = CarroItem;