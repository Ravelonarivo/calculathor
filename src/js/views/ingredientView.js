const cleanInputs = () => {
    elements.ingredientName.value = '';
    elements.ingredientPrice.value = '';
    elements.ingredientUnit.value = 'kg';
    elements.ingredientName.focus();
};

const insertIngredient = ingredient => {
    const markUp = `
        <div class="form-row list__item" data-ingredientid="${ ingredient.id }">
            <div class="form-group col-md-1">
                <button type="button" class="btn btn-outline-success btn-sm"><i class="icon ion-md-add"></i></button>
            </div>
            <div class="form-group col-md-4">
                <input type="text" class="form-control form-control-sm" placeholder="Name" value="${ingredient.name}">
            </div>
            <div class="form-group col-md-3">
                <input type="number" class="form-control form-control-sm" placeholder="Price" value="${ingredient.price}">
            </div>
            <div class="form-group col-md-3">
                <select class="form-control form-control-sm">
                    <option ${ ingredient.unit === 'kg' ? 'selected' : '' }>kg</option>
                    <option ${ ingredient.unit === 'piece' ? 'selected' : '' }>piece</option>
                </select>
            </div>
            <div class="form-group col-md-1">
                <button type="button" class="btn btn-outline-danger btn-sm btn-close"><i class="icon ion-md-trash"></i></button>
            </div>
        </div>
    `;

    elements.ingredientsList.insertAdjacentHTML('beforeend', markUp);
};

