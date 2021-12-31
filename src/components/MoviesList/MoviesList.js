import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MoviesList.module.css';
import noPoster from '../../images/noPoster.jpg';

export const MoviesList = ({movies, pathParam, location}) => {
    return (
        <ul className={s.moviesList} id='movies'>
                {movies.map(({ id, original_title, title, poster_path }) => (
                    <li key={id} className={s.moviesItem}>

                        <Link to={{pathname: `${pathParam}/${id}`, state: {from: {location}, },}} className={s.link}>
                            <img className={s.poster} src={poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : noPoster} alt={title || original_title} width={320} height={480} />
                            <p className={ s.movieTitle}>{ title || original_title}</p>
                        </Link>
                </li>)
            )}
        </ul>
    )
}

MoviesList.propTypes = {
     movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster_path: PropTypes.string,
            original_title: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
    ),
    pathParam: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
 }