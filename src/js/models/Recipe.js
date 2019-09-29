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

    editItem(itemID, newValue) {
        const item = this.items.find(item => item.id === parseInt(itemID, 10));     
        if (item) {
            if (parseFloat(newValue) || newValue === 0) {
                item.price = parseFloat(newValue);
            } else if (newValue === 'kg' || newValue === 'piece') {
                item.unit = newValue;
            } else {
                item.name = newValue;
            }
        }        
    }
}