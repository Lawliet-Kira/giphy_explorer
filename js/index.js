let inputElem = document.getElementById('giphy__search_form');

const updateRecentSearches = ( newSearch ) => {

    let recentSearchesElem = document.getElementById('giphy___recent_searches_list');

    // 1. Obtener todos los elementos de la lista
    let items = recentSearchesElem.querySelectorAll('li.list-group-item');

    // 2. Crear un arreglo de elementos del contenido
    let recentSearches = [...items].map( item => {
        return item.querySelector('button').value;
    });

    let newNode = `<li class="list-group-item"><button type="button" value="${newSearch}" class="btn btn-link btn-sm"> ${newSearch} </button> </li>`;
    

    items.push(newNode);

    console.log("recentSearches: ", recentSearches);

    // Actualizar el localStorage del navegador
    // window.localStorage.setItem('recentSearches', 'Obaseki Nosa');

}

inputElem.onsubmit = (e) => {

    e.preventDefault();


    updateRecentSearches('holi');

    // let valueForSearch = e.target.elements.giphy__search.value;


    // fetch(" ")
    //     .then(() => {

    //     })
    //     .catch(() => {

    //     })
};
