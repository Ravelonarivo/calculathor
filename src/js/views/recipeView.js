const insertItem = item => {

    const markup = `
    <tr class="recipe__item" data-recipeid="${item.id}">
        <td style="width: 5%"><input title="Enable/Disable" class="recipe__checkbox" type="checkbox" checked></td>
        <td style="width: 35%" class="recipe__name__${item.id}">${item.name}</td>
        <td style="width: 20%">
            <div class="input-group">
                <input class="recipe__quantity__${item.id} form-control form-control-sm" type="number" value="${item.quantity}" min="0">
                ${
                    item.unit === 'litre'
                    ? `<select class="form-control form-control-sm recipe__quantity__unit__${item.id}">
                            <option>L</option>
                            <option>dl</option>
                            <option>cl</option>
                      </select>`
                    : ''   
                }
            </div>
        </td>
        <td style="width: 10%" class="recipe__unit__${item.id}">${ item.unit === 'kg' ? '1000g' : item.unit === 'litre' ? 'litre' : 'piece' }</td>
        <td style="width: 10%" class="recipe__price__${item.id}">${ item.price }</td>
        <td style="width: 15%" class="recipe__total__${item.id}">${ item.total }</td>
        <td style="width: 5%" class="recipe__bin"><button title="delete" type="button" class="btn btn-outline-danger btn-sm btn-remove"><i class="icon ion-md-trash"></i></button></td>
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

const generateRecipeClassName = (label, itemID) => {
    return `recipe__${label}__${itemID}`;
}

const getRecipeId = event => {
    return event.target.closest('.recipe__item')
    ? event.target.closest('.recipe__item').dataset.recipeid
    : 0;
};

const recipeAlert = item => {
    elements.alertPopup.style.visibility = 'visible';
    elements.alertPopup.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${item.name} is already into the recipe!
        </div>
    `;

    setTimeout(() => {
        elements.alertPopup.innerHTML = '';
        elements.alertPopup.style.visibility = 'hidden';
    }, 5000);
};

const toggleQuantity = (isChecked, item) => {
    const quantityInput = document.querySelector(`.recipe__quantity__${item.id}`);
    if (isChecked) {
        quantityInput.removeAttribute('disabled');
    } else {
        quantityInput.setAttribute('disabled', '');
    }
}

const toggleColor = itemId => {
    const item = document.querySelector(`[data-recipeid="${itemId}"]`);
    item.classList.toggle('table-warning');
};



