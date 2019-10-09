class Ingredient {
    constructor(id, name, price, unit) {
        this.id = id;
        this._name = name;
        this._price = price;
        this._unit = unit;
        this._quantity = 0;
        this._total = (0).toFixed(2);
        this._enable;
    } 
    
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        this._unit = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get enable() {
        return this._enable;
    }

    set enable(value) {
        this._enable = value;
    }

    calculateTotal() {
        this._total = (((this._quantity ? this._quantity : 0)  * this._price) / (this._unit === 'kg' ? 1000 : 1)).toFixed(2);
    }

    check() {
        this._enable = true;
    }

    uncheck() {
        this._enable = false;
    }

    clTolitre() {
        return this._quantity * 0.01;
    }

    dlToLitre() {
        return this._quantity * 0.1;
    }
}

