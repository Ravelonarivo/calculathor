const state = { };

window.state = state;


// Ingredient controller
const controlIngredient = () => {

    // Add Ingredient
    if (elements.ingredientName.value && elements.ingredientPrice.value) {

        // Generate id
        const id = state.list 
        ? state.list.items[state.list.items.length - 1].id + 1
        : 1

        // Create Ingredient
        state.ingredient = new Ingredient(id, elements.ingredientName.value, elements.ingredientPrice.value, elements.ingredientUnit.value);
    }
};

const controlList = () => {

    // Create new list
    if (!state.list) {
        state.list = new List();
    }

    // Add item to list
    state.list.addItem(state.ingredient);

    // Add item into the DOM
    addItem(state.ingredient);
}

document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
        controlIngredient();
        cleanInputs();
        controlList();
    }
});

elements.ingredientValidateBtn.addEventListener('click', () => {
    controlIngredient();
    cleanInputs();
    controlList();
});