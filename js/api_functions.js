let api_key = "P5KIRosstOqXJFZV0rLIC8l2uyw8Ey0c";

export const searchForGifs = async (query, offset) => {

    try {

        return await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=5&offset=${offset}`);
        
    } catch (err) {
        throw err;
    }

}

export const fetchTrendingGifs = async (offset) => {

    try {

        return await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5&offset=${offset}`);

    } catch (err) {
        throw err;
    }

}