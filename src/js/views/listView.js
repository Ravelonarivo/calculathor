const addItem = ingredient => {
    const markUp = `
        <div class="form-row list__item" data-itemid="${ ingredient.id }">
            <div class="form-group col-md-1">
                <button type="button" class="btn btn-outline-success btn-sm btn-insert"><i class="icon ion-md-add"></i></button>
            </div>
            <div class="form-group col-md-4">
                <input type="text" class="list__item__name__${ ingredient.id } form-control form-control-sm" placeholder="Name" value="${ingredient.name}">
            </div>
            <div class="form-group col-md-3">
                <input type="number" class="list__item__price__${ ingredient.id } form-control form-control-sm" placeholder="Price" value="${ingredient.price}" min="0">
            </div>
            <div class="form-group col-md-3">
                <select class="list__item__unit__${ ingredient.id } form-control form-control-sm">
                    <option ${ ingredient.unit === 'kg' ? 'selected' : '' }>kg</option>
                    <option ${ ingredient.unit === 'piece' ? 'selected' : '' }>piece</option>
                </select>
            </div>
            <div class="form-group col-md-1">
                <button type="button" class="btn btn-outline-danger btn-sm btn-close"><i class="icon ion-md-trash"></i></button>
            </div>
        </div>
    `;

    elements.list.insertAdjacentHTML('beforeend', markUp);
};

const removeItem = itemId => {
    const item = document.querySelector(`[data-itemid="${itemId}"]`);
    item.parentNode.removeChild(item);
};

const getItemId = event => {
    return event.target.closest('.list__item') 
    ? event.target.closest('.list__item').dataset.itemid
    : 0;
};

const getNewValue = (event, itemId, label) => {
    let newValue = null;
    if (label === 'price') {
        newValue = event.target.closest(`.list__item__${label}__${itemId}`).value
        ? event.target.closest(`.list__item__${label}__${itemId}`).value
        : 0;
    } else {
        newValue = event.target.closest(`.list__item__${label}__${itemId}`).value;
    }

    return newValue;
};

const listAlert = itemName => {
    elements.alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${itemName} is already into the list!
        </div>
    `;
    
    setTimeout(() => {
        elements.alert.innerHTML = '';
    }, 5000);
};

const showSearchResult = (result, inputValue = null) => {
    elements.list.textContent = '';
    if (result.length > 0) {
        result.forEach(item => {
            addItem(item);
        });
    } else {
        elements.list.innerHTML = `
            <p class="search__no-result">No result result for "${inputValue}"</p>
        `;
    }
}

const validateInput = className => {
    const item = document.querySelector(className);
    if (item.classList.contains('is-invalid')) {
        item.classList.remove('is-invalid');
    }
};

const invalidadteInput = className => {
    const item = document.querySelector(className);
    item.classList.add('is-invalid');
};

const checkInputs = ids => {
    ids.forEach(id => {
        const itemNameInput = document.querySelector(`.list__item__name__${id}`);
        const itemPriceInput = document.querySelector(`.list__item__price__${id}`);
        if (itemNameInput.value === '') {
            itemNameInput.classList.add('is-invalid');
        }

        if (itemPriceInput.value === '0') {
            itemPriceInput.classList.add('is-invalid');
        }
    });
}

