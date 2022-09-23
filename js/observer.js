import { fetchMoreTrendingGifs, fetchMoreSearchGifs, lastSearch } from "./index.js";

const inviewport = ([e]) => {

    const { isIntersecting, target } = e;
    
    if ( isIntersecting ) {

        if( lastSearch ) {

            fetchMoreSearchGifs();

        } else {

            fetchMoreTrendingGifs();

        }

        observer.unobserve(target);

    }

}

const observer = new IntersectionObserver(inviewport);

export const getobserver = (node) => {
    observer.observe(node);
};