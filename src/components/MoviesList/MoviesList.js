import { Link } from 'react-router-dom';
import s from './MoviesList.module.css';
import noPoster from '../../images/noPoster.jpg';

export const MoviesList = ({movies, pathParam}) => {
    return (
        <ul className={s.moviesList} id='movies'>
                {movies.map(({ id, original_title, title, poster_path }) => (
                <li key={id} className={s.moviesItem}>
                        <Link to={`${pathParam}${id}`} className={s.link}>
                            <img className={s.poster} src={poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : noPoster} alt={title || original_title} width={320} />
                            <p className={ s.movieTitle}>{ title || original_title}</p>
                    </Link>
                </li>)
            )}
        </ul>
    )
}