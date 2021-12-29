const API_KEY = '9a19c8feeda66c8b37ea40a9476141ca';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}  

export async function ApiTrendMovie() {
    
    return fetchWithErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export async function ApiSearchMovie(query) {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

    return fetchWithErrorHandling(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`);

}

export async function ApiMovieDetails(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

    return fetchWithErrorHandling(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
  
}

export async function ApiMovieCast(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

    return fetchWithErrorHandling(`${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`);
  
}

export async function ApiMovieReview(movie_id) {
    // https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

    return fetchWithErrorHandling(`${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US`)
  
}



