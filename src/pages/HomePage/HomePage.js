// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import s from './HomePage.module.css';
// import PropTypes from 'prop-types';
import { ApiTrendMovie } from '../../api/themovideodb-api';
import { mapper } from '../../helpers/mapper';
// import noPoster from '../../images/noPoster.jpg';


import { MoviesList } from '../../components/MoviesList/MoviesList';

    
export const HomePage = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        ApiTrendMovie().then(data => {
            console.log(data);
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
        .catch(error=>console.log(error))
        
    }, [])

    const pathParam = '/movies';

    return (
        <>
            <h1 className={s.title}>Tranding movies</h1>
            {/* {movies && (<ul className={s.moviesList} id='movies'>
                {movies.map(({ id, original_title, title, poster_path }) => (
                <li key={id} className={s.moviesItem}>
                        <Link to={`/movies/${id}`} className={s.link}>
                            <img src={poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : noPoster} alt={title || original_title} width={320} />
                            <p className={ s.movieTitle}>{ title || original_title}</p>
                    </Link>
                </li>)
            )}
            </ul>)} */}



            {movies && <MoviesList movies={movies} pathParam={pathParam}/>}
        </>

    )
}

// HomePage.propTypes = {
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