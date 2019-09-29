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

    updateItem(itemID, newValue) {
        const item = this.items.find(item => item.id === parseInt(itemID, 10));     
        if (item) {
            if (parseFloat(newValue)) {
                item.price = parseFloat(newValue);
            } else if (newValue === 'kg' || newValue === 'piece') {
                item.unit = newValue;
            } else {
                item.name = newValue;
            }
        }        
    }
}