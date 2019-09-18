const state = { };

window.state = state;


// Ingredient controller
const controlIngredient = () => {

    // Add Ingredient
    if (elements.ingredientName.value && elements.ingredientPrice.value) {

        // Generate id
        let id = null;
        if (state.list) {
            id = state.list.items.length 
            ? state.list.items[state.list.items.length - 1].id + 1
            : 1;
        } else {
            id = 1;
        }
    

        // Create Ingredient
        state.ingredient = new Ingredient(id, elements.ingredientName.value, elements.ingredientPrice.value, elements.ingredientUnit.value);
    }
};


// List controler
const controlList = () => {

    if (elements.ingredientName.value && elements.ingredientPrice.value) {
        // Create new list
        if (!state.list) {
            state.list = new List();
        }

        // Add item to the list
        state.list.addItem(state.ingredient);

        // Add item on the view
        addItem(state.ingredient);
    }
}

document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
        controlIngredient();
        controlList();
        cleanInputs();
    }
});

elements.ingredientValidateBtn.addEventListener('click', () => {
    controlIngredient();
    controlList();
    cleanInputs();
});


// Manage click button on list view
elements.list.addEventListener('click', event => {

    // Get itemId
    const itemId = event.target.closest('.list__item').dataset.itemid;
    
    if (event.target.matches('.btn-close')) {
        // Get itemIndex
        const itemIndex = state.list.items.findIndex(item => item.id === parseInt(itemId, 10));
        
        // Remove item from list
        state.list.removeItem(itemIndex);
        
        // Remove item from list view
        removeItem(itemId);
    }
});