
export const updateLocalStorage = (ListNode) => {

    let arrayPersist = [];

    for (let item of ListNode.children) {
        arrayPersist.push(item.firstChild.value);
    }

    // Actualizar el localStorage del navegador
    window.localStorage.setItem('recentSearches', arrayPersist);

}

export const updateRecentSearches = ( newSearch ) => {

    let recentSearchesList = document.getElementById('giphy___recent_searches_list');

    if ( recentSearchesList.lastElementChild && Object.values(recentSearchesList.children).length === 3 ) 
        recentSearchesList.removeChild(recentSearchesList.lastElementChild);
    
    let newElemNode = document.createElement('li');

    newElemNode.classList.add("list-group-item");

    newElemNode.innerHTML = `<button type="button" value="${newSearch}" class="btn btn-link btn-sm"> ${newSearch} </button>`;

    recentSearchesList.insertBefore(newElemNode, recentSearchesList.firstChild);

    updateLocalStorage(recentSearchesList);

}