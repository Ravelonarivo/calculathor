const cleanInputs = () => {
    elements.ingredientName.value = '';
    elements.ingredientPrice.value = '';
    elements.ingredientUnit.value = 'kg';
    elements.ingredientName.focus();
};

const ingredientAlert = () => {
    elements.alertPopup.style.visibility = 'visible';
    elements.alertPopup.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Please fill all inputs!
        </div>
    `;
    
    setTimeout(() => {
        elements.alertPopup.innerHTML = '';
        elements.alertPopup.style.visibility = 'hidden';
    }, 5000);
};

const invalidateInputs = (name, price) => {
    name === '' 
    ? elements.ingredientName.classList.add('is-invalid')
    : elements.ingredientName.classList.remove('is-invalid');

    !price 
    ? elements.ingredientPrice.classList.add('is-invalid')
    : elements.ingredientPrice.classList.remove('is-invalid');

    setTimeout(() => {
        validateInputs();
    }, 5000);
};

const validateInputs = () => {
    if (elements.ingredientName.classList.contains('is-invalid')) {
        elements.ingredientName.classList.remove('is-invalid');
    }

    if (elements.ingredientPrice.classList.contains('is-invalid')) {
        elements.ingredientPrice.classList.remove('is-invalid');
    }   
};