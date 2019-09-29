const state = { };

window.state = state;


// Ingredient controller
const controlIngredient = () => {

    // Add Ingredient
    if (elements.ingredientName.value && elements.ingredientPrice.value) {

        // Generate id
        const id = state.ingredient ? state.ingredient.id + 1 : 1;
    

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
};


// Recipe controler
const controlRecipe = item => {

    // Create new recipe
    if (!state.recipe) {
        state.recipe = new Recipe();
    }

    // Test if item doesn't exist in the items
    const found = state.recipe.items.find(el => el.id === item.id);
    if (!found) {
        // Add item to recipe 
        state.recipe.addItem(item);

        // Insert item on recipe view
        insertItem(item);
    } else {

    }
};

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
    const itemId = event.target.closest('.list__item') 
    ? event.target.closest('.list__item').dataset.itemid
    : 0;
    
    if (event.target.closest('.btn-close')) {
        // Get itemIndex
        const itemIndex = state.list.items.findIndex(item => item.id === parseInt(itemId, 10));
        
        // Remove item from list
        state.list.removeItem(itemIndex);
        
        // Remove item from list view
        removeItem(itemId);
    } else if (event.target.closest('.btn-insert')) {
        const item = state.list.items.find(item => item.id === parseInt(itemId, 10));
        controlRecipe(item);
    }
});


// Manage change on list view
elements.list.addEventListener('input', event => {
    const itemID = event.target.closest('.list__item')
    ? event.target.closest('.list__item').dataset.itemid
    : 0;

    let newValue = null;
    let className = null;
    if (event.target.matches('.list__item__name')) {
        newValue = event.target.closest('.list__item__name').value;       
        className = `recipe__name__${itemID}`;
    } else if (event.target.matches('.list__item__price')) {
        newValue = event.target.closest('.list__item__price').value;
        className = `recipe__price__${itemID}`;
    } else if (event.target.matches('.list__item__unit')) {
        newValue = event.target.closest('.list__item__unit').value;
        className = `recipe__unit__${itemID}`;
    }

    // Update list item
    state.list.updateItem(itemID, newValue);

    // Update Recipe View
    updateItem(className, newValue); 
});

elements.btnClear.addEventListener('click', () => {
    if (state.recipe) {
        clearRecipe();
        state.recipe.clearItems();
    }
});