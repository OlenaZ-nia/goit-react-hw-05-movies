export const mapper = (movies) => {
    return movies.map(({id, original_title, title, poster_path })=>({id, original_title, title, poster_path}))
}