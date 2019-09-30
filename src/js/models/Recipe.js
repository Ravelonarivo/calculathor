class Recipe {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(item) {
        this.items.push(item);
    }

    clearItems() {
        this.items = [];
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    editItem(itemID, newValue, isItQuantity = false) {
        const item = this.items.find(item => item.id === parseInt(itemID, 10));     
        if (item) {
            if (isItQuantity) {
                item.quantity = parseFloat(newValue);
                item.calculateTotal();
            } else if (parseFloat(newValue) || newValue === 0) {
                item.price = parseFloat(newValue);
                item.calculateTotal();
            } else if (newValue === 'kg' || newValue === 'piece') {
                item.unit = newValue;
                item.calculateTotal();
            } else {
                item.name = newValue;
            }
        }       
    }

    calculateTotalCost() {
        this.total = this.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);
    }
}