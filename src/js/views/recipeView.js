const insertItem = item => {

    const markup = `
    <tr>
        <td class="recipe__name__${item.id}">${item.name}</td>
        <td><input class="form-control form-control-sm col-md-4" type="number" value="${item.quantity}"></td>
        <td class="recipe__unit__${item.id}">${ item.unit === 'kg' ? '1000g' : 'piece' }</td>
        <td class="recipe__price__${item.id}">${ item.price }</td>
        <td>${ item.total }</td>
    </tr>
    `;

    elements.recipe.insertAdjacentHTML('beforeend', markup);
};

const updateItem = (className, newValue) => {
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