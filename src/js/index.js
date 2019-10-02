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

        const ingredient = Object.create(state.ingredient);
        // Add item to the list
        state.list.addItem(ingredient);

        // Add item on the view
        addItem(ingredient);
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
        const ingredient = Object.create(item);
        // Add item to recipe 
        state.recipe.addItem(ingredient);

        // Insert item on recipe view
        insertItem(ingredient);
    } else {
        // Show alert
        alert(item)
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
        let itemIndex = state.list.getItemIndex(itemId);   
        // Remove item from list
        state.list.removeItem(itemIndex);
        // Remove item from list view
        removeItem(itemId);

        //Remove recipe item and upate total cost
        if (state.recipe && state.recipe.items.length > 0) {
            // get itemIndex
            itemIndex = state.recipe.getItemIndex(item => item.id === parseInt(itemId, 10))
            // remove item from recipe 
            state.recipe.removeItem(itemIndex);
            // remove item from recipe view
            deleteItem(itemId);

            // update total cost
            state.recipe.calculateTotalCost();

            // edit recipe view
            updateTotalCost(state.recipe.total);
        }

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
        newValue = event.target.closest('.list__item__price').value
        ? event.target.closest('.list__item__price').value
        : 0;
        className = `recipe__price__${itemID}`;
    } else if (event.target.matches('.list__item__unit')) {
        newValue = event.target.closest('.list__item__unit').value;
        className = `recipe__unit__${itemID}`;
    }
    
    // Edit list item
    state.list.editItem(itemID, newValue);

    // Edit recipe item
    if (state.recipe && state.recipe.items.length > 0) {
        state.recipe.editItem(itemID, newValue);

        // update total cost
        state.recipe.calculateTotalCost();

        // Edit recipe View
        editItem(className, newValue); 
        className = `recipe__total__${itemID}`;
        const item = state.recipe.items.find(item => item.id === parseInt(itemID, 10));
        if (item) {
            editItem(className, item.total);
            updateTotalCost(state.recipe.total);
        }
    }
});


// Manage change on recipe view
elements.recipe.addEventListener('input', event => {
    const recipeID = event.target.closest('.recipe__item')
    ? event.target.closest('.recipe__item').dataset.recipeid
    : 0;

    let newValue = event.target.matches('.recipe__quantity')
    ? event.target.closest('.recipe__quantity').value
    : 0
         
    // Edit recipe item 
    state.recipe.editItem(recipeID, newValue, true);

    // Calculate total cost
    state.recipe.calculateTotalCost();

    // Edit recipe view
    const className = `recipe__total__${recipeID}`;
    const item = state.recipe.items.find(item => item.id === parseInt(recipeID, 10));
    editItem(className, item.total);
    updateTotalCost(state.recipe.total);
});


// Clear recipe 
elements.btnClear.addEventListener('click', () => {
    if (state.recipe) {
        clearRecipe();
        state.recipe.clearItems();
        state.recipe.calculateTotalCost();
        updateTotalCost(state.recipe.total);
    }
});