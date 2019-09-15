const state = {
    ingredients: [],
    recipe: []
};

window.state = state;

const controlIngredient = () => {

    // Add Ingredient
    if (elements.ingredientName.value && elements.ingredientPrice.value) {

        // Generate id
        const id = state.ingredients[state.ingredients.length -1] 
        ? state.ingredients[state.ingredients.length -1].id +1
        : 1;

        // Create Ingredient
        const ingredient = new Ingredient(id, elements.ingredientName.value, elements.ingredientPrice.value, elements.ingredientUnit.value);
        state.ingredients.push(ingredient);
        insertIngredient(ingredient);
    }
};

document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
        controlIngredient();
        cleanInputs();
    }
});

elements.ingredientValidateBtn.addEventListener('click', () => {
    controlIngredient();
    cleanInputs();
});