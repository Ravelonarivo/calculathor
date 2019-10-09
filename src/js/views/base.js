const elements = {
    ingredientName: document.querySelector('.ingredient__name'),
    ingredientPrice: document.querySelector('.ingredient__price'),
    ingredientUnit: document.querySelector('.ingredient__unit'),
    ingredientValidateBtn: document.querySelector('.ingredient__validate--btn'),
    list: document.querySelector('.list'),
    recipe: document.querySelector('.recipe'),
    btnClear: document.querySelector('.btn-clear'),
    recipeTotalCost: document.querySelector('.recipe__totalcost'),
    alertPopup: document.querySelector('.alert__popup'),  
    searchInput: document.querySelector('.search__input'),
    currentYear: document.querySelector('.current-year')
};

const getCurrentYear = () => {
    return new Date().getFullYear();
};