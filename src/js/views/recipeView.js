const insertItem = item => {

    const markup = `
    <tr>
        <td>${item.name}</td>
        <td><input class="form-control form-control-sm col-md-4" type="number" value="${item.quantity}"></td>
        <td>${ item.unit === 'kg' ? '1000g' : 'piece' }</td>
        <td>${ item.price }</td>
        <td>${ item.total }</td>
    </tr>
    `;

    elements.recipe.insertAdjacentHTML('beforeend', markup);
};