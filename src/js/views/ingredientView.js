const cleanInputs = () => {
    elements.ingredientName.value = '';
    elements.ingredientPrice.value = '';
    elements.ingredientUnit.value = 'kg';
    elements.ingredientName.focus();
};

const ingredientAlert = () => {
    elements.recipeAlert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Please fill all inputs!
        </div>
    `;
    
    setTimeout(() => {
        elements.recipeAlert.innerHTML = '';
    }, 5000);
};