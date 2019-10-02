const elements = {
    ingredientName: document.querySelector('.ingredient__name'),
    ingredientPrice: document.querySelector('.ingredient__price'),
    ingredientUnit: document.querySelector('.ingredient__unit'),
    ingredientValidateBtn: document.querySelector('.ingredient__validate--btn'),
    list: document.querySelector('.list'),
    recipe: document.querySelector('.recipe'),
    btnClear: document.querySelector('.btn-clear'),
    recipeTotalCost: document.querySelector('.recipe__totalcost'),
    recipeAlert: document.querySelector('.recipe__alert')
};

const alert = item => {
    if (item) {
        elements.recipeAlert.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${item.name} is already in the recipe!
            </div>
        `
    } else {
        elements.recipeAlert.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please fill all inputs!
            </div>
        `
    }

    setTimeout(() => {
        elements.recipeAlert.innerHTML = '';
    }, 5000);
}