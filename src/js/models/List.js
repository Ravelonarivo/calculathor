class List {
    constructor() {
        this.items = [];
    }

    addItem(ingredient) {
        this.items.push(ingredient);
    }
    
    removeItem(index) {
        this.items.splice(index, 1);
    }

    editItem(itemID, newValue) {
        const item = this.items.find(item => item.id === parseInt(itemID, 10));
        if (parseFloat(newValue) || newValue === 0) {
            item.price = parseFloat(newValue);
        } else if (newValue === 'kg' || newValue === 'piece') {
            item.unit = newValue;
        } else {
            item.name = newValue;
        }
        
    }
}