export const selectData = ({ original_title, title, poster_path, release_date, vote_average, overview, genres }) => {
    // const { original_title, title, poster_path, release_date, vote_average, overview, genres } = data;
    return Object.assign({}, { original_title, title, poster_path, release_date, vote_average, overview, genres });
}




