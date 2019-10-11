class List {
    constructor() {
        this.items = [];
        this.itemsObj = [];
    }

    addItem(ingredient) {
        this.items.push(ingredient);
    }
    
    removeItem(index) {
        this.items.splice(index, 1);
    }

    editItem(itemID, newValue, label) {
        const item = this.getItem(itemID);
        if (label === 'price') {
            item.price = parseFloat(newValue);
        } else if (label === 'unit') {
            item.unit = newValue;
        } else if (label === 'name') {
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
        return parseFloat(param) || param === '0' || param === '0.'
        ? this.items.filter(item => re.test(item.price) === true)
        : this.items.filter(item => re.test(item.name) === true);
    }

    saveItems(param) {
        if (typeof param === 'number') {
            this.itemsObj.splice(param, 1);
        } else if (typeof param === 'string') {
            const item = this.getItem(param);
            const itemObj = this.itemsObj.find(item => item.id === parseInt(param));
            itemObj.name = item.name;
            itemObj.price = item.price;
            itemObj.unit = item.unit;
        } else if (typeof param === 'object') {
            this.itemsObj.push({
                id: param.id,
                name: param.name,
                price: param.price,
                unit: param.unit
            });
        }

        localStorage.setItem('items', JSON.stringify(this.itemsObj));
    }

    recoverItems() {
        const result = JSON.parse(localStorage.getItem('items'));      
        if (result) {
            this.items = result.map(item => new Ingredient(item.id, item.name, item.price, item.unit));
            this.itemsObj = result;
        } 
    }

    getItemsId() {
        return this.items.map(item => item.id);
    }
}