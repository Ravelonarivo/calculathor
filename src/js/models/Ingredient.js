class Ingredient {
    constructor(id, name, price, unit) {
        this.id = id;
        this._name = name;
        this._price = price;
        this._unit = unit;
        this._quantity = 1;
        this._total = 0;
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
        this.total = value;
    }
}

