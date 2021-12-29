import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import SearchMovies from '../../components/SearchMovies/SearchMovies';
import { ApiSearchMovie } from '../../api/themovideodb-api';
import { mapper } from '../../helpers/mapper';
// import noPoster from '../images/noPoster.jpg';

import { MoviesList } from '../../components/MoviesList/MoviesList';

    
export const MoviesPage = () => {
    const history = useHistory();
    const location = useLocation();
    const { url } = useRouteMatch();

    const [movies, setMovies] = useState([]);

    let searchParams = new URLSearchParams(location.search).get("query") ?? '';
    // console.log(searchParams)

    const handleSubmit = (query) => {
        setMovies([]);

        history.push({...location, search: `query=${query}`,});
    };
    
    useEffect(() => {
        if (searchParams) {
            ApiSearchMovie(searchParams).then(data => {
                if (data.total_pages === 0) {
                toast.error('Not found!');
                return;
                }
                // setMovies(prevState => [...prevState, ...mapper(data.results)]);
                setMovies([...mapper(data.results)]);
                setTimeout(() => {
                document.querySelector('#movies').scrollIntoView({
                    behavior: 'smooth', block: 'center',
                });
            }, 1000);
            })
                .catch(error => console.log(error));
        }
        
    }, [searchParams]);

    const pathParam = url;

    return (
        <>
            <SearchMovies onSubmit={handleSubmit} />
            {/* {movies && (<ul id='movies'>
                {movies.map(({ id, original_title, title,poster_path }) => (
                <li key={id}>
                    <Link to={`${url}${id}`}>
                        <img src={poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : noPoster} alt={title || original_title} width={320} />
                            <p className={ s.movieTitle}>{ title || original_title}</p>
                    </Link>

                    <Link to={`/movies/${id}`}>
                        { original_title || title}
                    </Link>
                </li>)
            )}
            </ul>)} */}

            {movies.length !==0 && <MoviesList movies={movies} pathParam={pathParam}/>}
        </>

    )
}

// MoviesPage.propTypes = {
//      images: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             webformatURL: PropTypes.string.isRequired,
//             largeImageURL: PropTypes.string.isRequired,
//             tags: PropTypes.string.isRequired,
//         }).isRequired,
//     ),
//     onClickImg: PropTypes.func.isRequired,
//  }