import { getobserver } from './observer.js'; 
import { updateLocalStorage, updateRecentSearches } from './recent_functions.js'
import { searchForGifs, fetchTrendingGifs } from './api_functions.js';

let offsetTrend = 0, offsetSearch = 0;

export let lastSearch = "";

const makeImage = (element) => {
    const img = document.createElement("img");
    img.src = element?.images.downsized.url;
    img.alt = element?.title;
    return img;
}

export const fetchMoreTrendingGifs = async () => {

    fetchTrendingGifs(offsetTrend)
        .then((response) => response.json())
        .then((content) => {
            let data = content?.data;
            if ( data.length > 0 ) {
                let gifsContainer = document.getElementById('giphy__list_container');
                let lastImg = data.pop();
                const lastImgNode = makeImage(lastImg);
                getobserver(lastImgNode);   
                const templates = data.map((img) => makeImage(img));
                gifsContainer.append(...templates);
                gifsContainer.append(lastImgNode);
                offsetTrend += 5;
            }
        })
        .catch(err => console.log("error: ", err));

}

export const fetchMoreSearchGifs = async () => {

    let currentValue = document.getElementById("giphy__search").value;

    searchForGifs(currentValue, offsetSearch)
        .then((response) => response.json())
        .then((content) => {
            let data = content?.data;
            if ( data.length > 0 ) {
                let gifsContainer = document.getElementById('giphy__list_container');
                let lastImg = data.pop();
                const lastImgNode = makeImage(lastImg);
                getobserver(lastImgNode);   
                const templates = data.map((img) => makeImage(img));
                gifsContainer.append(...templates);
                gifsContainer.append(lastImgNode);
                offsetSearch += 5;
            }
        })
        .catch(err => console.log("error: ", err));

}

document.addEventListener("DOMContentLoaded", function () {

    /* get the trendings gift onload window */
    fetchTrendingGifs(offsetTrend)
        .then(response => response.json())
        .then((content) => {

            let gifsContainer = document.getElementById('giphy__list_container');
            let data = content?.data;
            let lastImg = data.pop();
            const lastImgNode = makeImage(lastImg);
            getobserver(lastImgNode);

            let arrGifsTrend = data.map((gifObj) => {
                return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
            }) 

            gifsContainer.innerHTML = arrGifsTrend.join(" ");
            gifsContainer.append(lastImgNode);
            offsetTrend += 5;

        })
        .catch((err) => {
            console.log("err: ", err);
        });

    /* get recent searches from localStorage */
    (() => { 

        let recentSearches = window.localStorage.getItem('recentSearches');

        if ( recentSearches ) {

            let arrRecentSeraches = recentSearches.split(',');

            let recentSearchesList = document.getElementById('giphy___recent_searches_list');
    
            let arrNodeLi = arrRecentSeraches.map((value) => {
                return `<li class="list-group-item"><button type="button" value=${value} class="btn btn-link btn-sm"> ${value} </button></li>`
            }).join(' ');
    
            recentSearchesList.innerHTML = arrNodeLi;
        
        }   

    })();

    /* Logic for searching */
    document.getElementById('giphy__search_form').onsubmit = (e) => {
    
        e.preventDefault();
        offsetSearch = 0;

        let valueToSearch = e.target.elements.giphy__search.value;
    
        searchForGifs(valueToSearch)
            .then( response => response.json() )
            .then( (content) => {

                let gifsContainer = document.getElementById('giphy__list_container');

                if ( content?.data.length > 0 ) {

                    let data = content?.data;
                    let lastImg = data.pop();
                    const lastImgNode = makeImage(lastImg);
                    getobserver(lastImgNode);

                    let arrGifsTrend = data.map((gifObj) => {
                        return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
                    }) 

                    gifsContainer.innerHTML = arrGifsTrend.join(" ");
                    gifsContainer.append(lastImgNode);

                    lastSearch = valueToSearch;
                    offsetSearch += 5;

                } else {
                    
                    let imgSrc = `<img src="./assets/nodata.gif" />`;

                    gifsContainer.innerHTML = imgSrc;

                }
               
            })
            .catch( err => {
                console.log("error: ", err);
            })

        updateRecentSearches(valueToSearch);
        
    };

    /* Logic for update recent searches */
    document.getElementById('giphy___recent_searches_list').addEventListener('click', (e) => {

        if ( e.target && e.target.nodeName == 'BUTTON' ) {

            let valueToSearch = e.target.value;
            offsetSearch = 0;

            document.getElementById("giphy__search").value = valueToSearch;

            searchForGifs(valueToSearch)
                .then( response => response.json() )
                .then( (content) => {

                    let gifsContainer = document.getElementById('giphy__list_container');

                    if ( content?.data.length > 0 ) {

                        let data = content?.data;
                        let lastImg = data.pop();
                        const lastImgNode = makeImage(lastImg);
                        getobserver(lastImgNode);

                        let arrGifsTrend = data.map((gifObj) => {
                            return `<img src=${gifObj.images.downsized.url} title=${gifObj.title} />`;
                        }) 

                        gifsContainer.innerHTML = arrGifsTrend.join(" ");
                        gifsContainer.append(lastImgNode);
                        lastSearch = valueToSearch;
                        offsetSearch += 5;

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

