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
        const item = this.getItem(itemID);
        if (parseFloat(newValue) || newValue === 0) {
            item.price = parseFloat(newValue);
        } else if (newValue === 'kg' || newValue === 'piece') {
            item.unit = newValue;
        } else {
            item.name = newValue;
        }
        
    }

    getItemIndex(itemId) {
        return this.items.findIndex(item => item.id === parseInt(itemId, 10));
    }

    getItem(itemId) {
        return this.items.find(item => item.id === parseInt(itemId, 10));
    }

    findItem(itemName) {
        const re = new RegExp(`^${itemName}$`, 'i');
        return this.items.filter(item => re.test(item.name) === true);
    }

    searchItem(param) {
        const re = new RegExp(`^${param}`, 'i');
        return parseFloat(param) 
        ? this.items.filter(item => re.test(item.price) === true)
        : this.items.filter(item => re.test(item.name) === true);
    }
}