document.addEventListener("DOMContentLoaded", function () {

    let api_key = "P5KIRosstOqXJFZV0rLIC8l2uyw8Ey0c";

    const searchForGifs = async (query) => {

        try {

            return await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=5`);
            
        } catch (err) {
            throw err;
        }

    }

    const fetchTrendingGifs = async () => {

        try {

            return await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5`);

        } catch (err) {
            throw err;
        }

    }

    fetchTrendingGifs()
        .then(response => response.json())
        .then((content) => {
            let gifsContainer = document.getElementById('giphy__list_container');
            let arrGifsTrend = content?.data.map((gifObj) => {
                return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
            }) 
            gifsContainer.innerHTML = arrGifsTrend.join(" ");
        })
        .catch((err) => {
            console.log("err: ", err);
        });


    (() => { 

        let recentSearches = window.localStorage.getItem('recentSearches');
        
        let arrRecentSeraches = recentSearches.split(',');

        let recentSearchesList = document.getElementById('giphy___recent_searches_list');

        let arrNodeLi = arrRecentSeraches.map((value) => {
            return `<li class="list-group-item"><button type="button" value=${value} class="btn btn-link btn-sm"> ${value} </button></li>`
        }).join(' ');

        recentSearchesList.innerHTML = arrNodeLi;

    })();

    const searchRecent = (e) => {

        let recentValue = e.target.value;
        
        searchForGifs(recentValue)
            .then( response => response.json() )
            .then( (content) => {
                console.log("search: ", content);
            })
            .catch( err => {
                console.log("error: ", err);
            });

    }

    const updateLocalStorage = (ListNode) => {

        let arrayPersist = [];

        for (item of ListNode.children) {
            arrayPersist.push(item.firstChild.value);
        }

        // Actualizar el localStorage del navegador
        window.localStorage.setItem('recentSearches', arrayPersist);

    }

    const updateRecentSearches = ( newSearch ) => {

        let recentSearchesList = document.getElementById('giphy___recent_searches_list');

        if ( recentSearchesList.lastElementChild && Object.values(recentSearchesList.children).length === 3 ) 
            recentSearchesList.removeChild(recentSearchesList.lastElementChild);
        
        let newElemNode = document.createElement('li');
    
        newElemNode.classList.add("list-group-item");
    
        newElemNode.innerHTML = `<button type="button" value="${newSearch}" class="btn btn-link btn-sm"> ${newSearch} </button>`;

        recentSearchesList.insertBefore(newElemNode, recentSearchesList.firstChild);

        updateLocalStorage(recentSearchesList);
    
    }

    document.getElementById('giphy__search_form').onsubmit = (e) => {
    
        e.preventDefault();

        let valueForSearch = e.target.elements.giphy__search.value;
    
        searchForGifs(valueForSearch)
            .then( response => response.json() )
            .then( (content) => {

                let gifsContainer = document.getElementById('giphy__list_container');

                if ( content?.data.length > 0 ) {

                    let arrGifsTrend = content?.data.map((gifObj) => {
                        return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
                    }) 

                    gifsContainer.innerHTML = arrGifsTrend.join(" ");

                } else {
                    
                    let imgSrc = `<img src="./assets/nodata.gif" />`;

                    gifsContainer.innerHTML = imgSrc;

                }
               
            })
            .catch( err => {
                console.log("error: ", err);
            })

        updateRecentSearches(valueForSearch);
        
    };

    document.getElementById('giphy___recent_searches_list').addEventListener('click', (e) => {

        if ( e.target && e.target.nodeName == 'BUTTON' ) {

            let valueToSearch = e.target.value;

            document.getElementById("giphy__search").value = valueToSearch;

            searchForGifs(valueToSearch)
                .then( response => response.json() )
                .then( (content) => {

                    let gifsContainer = document.getElementById('giphy__list_container');

                    if ( content?.data.length > 0 ) {

                        let arrGifsTrend = content?.data.map((gifObj) => {
                            return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
                        }) 

                        gifsContainer.innerHTML = arrGifsTrend.join(" ");

                    } else {
                        
                        let imgSrc = `<img src="./assets/nodata.gif" />`;

                        gifsContainer.innerHTML = imgSrc;

                    }
                
                })
                .catch( err => {
                    console.log("error: ", err);
                });

        }

    });

});

