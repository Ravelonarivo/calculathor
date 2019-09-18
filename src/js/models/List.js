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
}