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

    editItem(itemID, quantityUnit, label, newValue = null) {
        const item = this.getItem(itemID);     
        if (item) {
            if (label === 'quantity') {
                item.quantity = parseFloat(newValue);
                if (quantityUnit) {    
                    this.convertQuantityUnit(item, quantityUnit);
                } else {
                    item.calculateTotal();
                }  
            } else if (label === 'quantityUnit') {
                this.convertQuantityUnit(item, quantityUnit); 
            } else if (label === 'price') {
                item.price = parseFloat(newValue);
                if (quantityUnit) {
                    this.convertQuantityUnit(item, quantityUnit); 
                } else {
                    item.calculateTotal();
                }
            } else if (label === 'unit') {
                item.unit = newValue;
                item.calculateTotal();
            } else if (label === 'name'){
                item.name = newValue;
            }
        }       
    }

    getItemIndex(itemId) {
        return this.items.findIndex(item => item.id === parseInt(itemId, 10));
    }

    calculateTotalCost() {
        this.total = this.items
                    .filter(item => item.enable === true)
                    .reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);
    }

    getItem(itemID) {
        return this.items.find(item => item.id === parseInt(itemID, 10));
    }

    increaseTotalCost(itemTotal) {
        this.total = (parseFloat(this.total) + parseFloat(itemTotal)).toFixed(2);  
    }

    decreaseTotalCost(itemTotal) {
        this.total = (parseFloat(this.total) - parseFloat(itemTotal)).toFixed(2);
    }

    convertQuantityUnit(item, quantityUnit) {
        const tmp = item.quantity;
        item.quantity = quantityUnit === 'L' 
        ? item.quantity
        : quantityUnit === 'dl' ? item.dlToLitre() : item.clToLitre();
        item.calculateTotal();
        item.quantity = tmp; 
    }
}