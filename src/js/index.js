const state = { };

window.state = state;


// Ingredient controller
const controlIngredient = () => {

    // Add Ingredient
    const ingredientName = formatInput(elements.ingredientName.value);
    if (ingredientName !== '' && elements.ingredientPrice.value) {  
        // Find item from list
        const item = state.list 
        ? state.list.findItem(ingredientName)
        : [];

        // Create new Ingredient
        if (item.length === 0) {
            // Generate id
            const id = state.ingredient 
            ? state.ingredient.id + 1 
            : state.list.items.length > 0 
            ? state.list.items[state.list.items.length -1].id + 1
            : 1;
        
            // Create Ingredient
            state.ingredient = new Ingredient(id, ingredientName, elements.ingredientPrice.value, elements.ingredientUnit.value);
        }

        validateInputs();
    } else {
        ingredientAlert();
        invalidateInputs(ingredientName, elements.ingredientPrice.value);
    }
};


// List controler
const controlList = () => {

    const ingredientName = formatInput(elements.ingredientName.value);
    if (ingredientName !== '' && elements.ingredientPrice.value) {       
        
        // Create new list
        if (!state.list) {
            state.list = new List();
        }

        // Find item
        const item = state.list.findItem(ingredientName);
        if (item.length === 0) {
            // Create a copy of ingredient
            const ingredient = Object.create(state.ingredient);
            // Add item to the list
            state.list.addItem(ingredient);
            // Save item 
            state.list.saveItems(ingredient);

            // Add item on the view
            addItem(ingredient);

            cleanInputs();
        } else {
            listAlert(ingredientName);
        }
    }
};


// Recipe controler
const controlRecipe = item => {

    // Create new recipe
    if (!state.recipe) {
        state.recipe = new Recipe();
    }

    // Test if item doesn't exist in the items
    const found = state.recipe.getItem(item.id);
    if (!found) {
        const ingredient = Object.create(item);
        // Check item model
        ingredient.check();

        // Add item to recipe 
        state.recipe.addItem(ingredient);

        // Insert item on recipe view
        insertItem(ingredient);
    } else {
        // Show alert
        recipeAlert(item)
    }
};

document.addEventListener('keypress', event => {
    if ((event.keyCode === 13 || event.which === 13)) {
        event.preventDefault();
        if (event.target.closest('.ingredient__formular')) {
            controlIngredient();
            controlList();
        } 
    }
});

elements.ingredientValidateBtn.addEventListener('click', () => {
    controlIngredient();
    controlList();
});


// Manage click button on list view
elements.list.addEventListener('click', event => {

    // Get itemId
    const itemId = getItemId(event);
    
    if (event.target.closest('.btn-close')) {
        // Get itemIndex
        let itemIndex = state.list.getItemIndex(itemId);   
        // Remove item from list
        state.list.removeItem(itemIndex);
        // Remove item from list view
        removeItem(itemId);
        // Save change
        state.list.saveItems(itemIndex);
        
        //Remove recipe item and update total cost
        if (state.recipe && state.recipe.items.length > 0) {
            // get itemIndex
            itemIndex = state.recipe.getItemIndex(itemId);
            itemIndex >= 0 
            ? removeItemFromRecipe(itemId, itemIndex)
            : '';
        }

    } else if (event.target.closest('.btn-insert')) {
        const item = state.list.getItem(itemId);
        controlRecipe(item);
    }
});


// Manage change on list view
elements.list.addEventListener('input', event => {
    // Get item id
    const itemID = getItemId(event);

    let newValue = null;
    let className = null;
    let listItemClassName = null;
    let inputLabel = null;
    if (event.target.matches(`.list__item__name__${itemID}`)) {
        inputLabel = 'name';
        newValue = formatInput(getNewValue(event, itemID, inputLabel));       
        className = generateRecipeClassName(inputLabel, itemID);
        listItemClassName = `.list__item__name__${itemID}`;
        if (newValue !== '') {
            validateInput(listItemClassName);
        } else {
            invalidadteInput(listItemClassName);
        }
    } else if (event.target.matches(`.list__item__price__${itemID}`)) {
        inputLabel =  'price';
        newValue = getNewValue(event, itemID, inputLabel);
        className = generateRecipeClassName(inputLabel, itemID);
        listItemClassName = `.list__item__price__${itemID}`;
        if (newValue !== 0 && newValue !== '0') {
            validateInput(listItemClassName);
        } else {
            invalidadteInput(listItemClassName);
        }
    } else if (event.target.matches(`.list__item__unit__${itemID}`)) {
        inputLabel = 'unit';
        newValue = getNewValue(event, itemID, 'unit');;
        className = generateRecipeClassName('unit', itemID);
    }

    // Edit list item
    state.list.editItem(itemID, newValue, inputLabel);
    // Save change 
    state.list.saveItems(itemID);

    // Edit recipe item
    if (state.recipe && state.recipe.items.length > 0) {
        state.recipe.editItem(itemID, newValue);

        // update total cost
        state.recipe.calculateTotalCost();

        // Edit recipe View
        editItem(className, newValue); 
        className = generateRecipeClassName('total', itemID);
        const item = state.recipe.getItem(itemID);
        if (item) {
            editItem(className, item.total);
            updateTotalCost(state.recipe.total);
        }
    }
});


// Manage change on recipe view
elements.recipe.addEventListener('input', event => {
    const recipeID = getRecipeId(event);
    const item = state.recipe.getItem(recipeID);

    if (event.target.matches(`.recipe__quantity__${item.id}`)) {
        const newValue = event.target.matches(`.recipe__quantity__${item.id}`)
        ? event.target.closest(`.recipe__quantity__${item.id}`).value
        : 0
            
        // Edit recipe item 
        state.recipe.editItem(recipeID, newValue, true);

        // Calculate total cost
        state.recipe.calculateTotalCost();

        // Edit recipe view
        const className = generateRecipeClassName('total', recipeID);
        editItem(className, item.total);
        updateTotalCost(state.recipe.total);
    } else if (event.target.matches('.recipe__checkbox')) {
        // Check if item is checked on the view
        const isChecked = event.target.closest('.recipe__checkbox').checked;
        if (isChecked) {
            // Toggle color
            toggleColor(item.id);
            // Check item model
            item.check();
            // Increase total cost
            state.recipe.increaseTotalCost(item.total);
        } else {
            // Toggle color
            toggleColor(item.id);
            // Uncheck item model
            item.uncheck();
            // Decrease item model
            state.recipe.decreaseTotalCost(item.total);
        }

        toggleQuantity(isChecked, item);
        updateTotalCost(state.recipe.total);
    }
});


// Manage click button on recipe view
elements.recipe.addEventListener('click', event => {
    const recipeID = getRecipeId(event);
    const item = state.recipe.getItem(recipeID);

    if (event.target.closest('.btn-remove')) {
        removeItemFromRecipe(item.id);
    }
});


// Manage change on search input
elements.searchInput.addEventListener('input', event => {
    if (state.list && state.list.items.length > 0) {
        const searchInputValue = formatInput(event.target.value);
        const result = state.list.searchItem(searchInputValue);
        if (result.length > 0) {
            showSearchResult(result);
        } else {
            showSearchResult(result, searchInputValue);
        }
    }
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

 
window.addEventListener('load', () => {
    state.list = new List();

    // recover items
    state.list.recoverItems();

    // Render list
    if (state.list.items.length > 0) {
        showSearchResult(state.list.items);
        // Check if all list inputs are valide
        checkInputs(state.list.getItemsId());
    }
});


const removeItemFromRecipe = (itemId, itemIndex) => {
    // remove item from recipe 
    state.recipe.removeItem(itemIndex);
    // remove item from recipe view
    deleteItem(itemId);

    // update total cost
    state.recipe.calculateTotalCost();

    // update total cost on recipe view
    updateTotalCost(state.recipe.total);
};

const formatInput = input => {
    return input.trim()
               .split(' ')
               .filter(item => item !== '')
               .join(' ');
};