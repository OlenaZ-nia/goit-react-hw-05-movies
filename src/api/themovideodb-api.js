const API_KEY = '9a19c8feeda66c8b37ea40a9476141ca';
const BASE_URL = 'https://api.themoviedb.org/3';


export async function ApiTrendMovie() {
    
    let url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
    
    const response = await fetch(url);
    const result = await response.json();
    return result;

    // const response = await fetch(url);
    // return response.ok
    //     ? await response.json()
    // : Promise.reject(new Error("error"));
}

export async function ApiSearchMovie(query) {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
    
    const response = await fetch(url);
    const result = await response.json();
    return result;

}

export async function ApiMovieDetails(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    let url = `${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const result = await response.json();
    return result;
  
}

export async function ApiMovieCast(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
    let url = `${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const result = await response.json();
    return result;
  
}

export async function ApiMovieReview(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
    let url = `${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US`;
    
    const response = await fetch(url);
    const result = await response.json();
    return result;
  
}



