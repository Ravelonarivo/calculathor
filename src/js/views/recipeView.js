const insertItem = item => {

    const markup = `
    <tr class="recipe__item" data-recipeid="${item.id}">
        <td class="recipe__name__${item.id}">${item.name}</td>
        <td><input class="recipe__quantity form-control form-control-sm col-md-4" type="number" value="${item.quantity}" min="0"></td>
        <td class="recipe__unit__${item.id}">${ item.unit === 'kg' ? '1000g' : 'piece' }</td>
        <td class="recipe__price__${item.id}">${ item.price }</td>
        <td class="recipe__total__${item.id}">${ item.total }</td>
    </tr>
    `;

    elements.recipe.insertAdjacentHTML('beforeend', markup);
};

const editItem = (className, newValue) => {
    const item = document.querySelector(`.${className}`);   
    if (item) {
        item.textContent = className.includes('unit')
        ? newValue === 'kg' ? '1000g' : 'piece'
        : newValue;
    }
};

const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

const deleteItem = itemId => {
    const item = document.querySelector(`[data-recipeid="${itemId}"]`);
    item.parentNode.removeChild(item);
};

const updateTotalCost = totalCost => {
    elements.recipeTotalCost.textContent = totalCost;
}

const alert = item => {
    elements.recipeAlert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${item.name} is already in the recipe!
        </div>
    `;

    setTimeout(() => {
        elements.recipeAlert.innerHTML = '';
    }, 5000);
}