import { Route, NavLink, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './MovieDetailsPage.module.css';
import { ApiMovieDetails } from '../../api/themovideodb-api';
import {selectData} from '../../helpers/selectData';
import noPoster from '../../images/noPoster.jpg';

import { Cast } from '../../components/Cast/Cast';
import { Reviews } from '../../components/Reviews/Reviews';

export const MovieDetailsPage = () => {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    
    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        document.querySelector('#c').scrollIntoView({
                    behavior: 'smooth',
                });
        ApiMovieDetails(movieId).then(data => {
            data.release_date = data.release_date.slice(0, 4);
            // data.release_date = data.release_date.substring(0, 4);
            
            // setMovie(data);
            setMovie(selectData(data));

        // console.log(data)
    })
        .catch(error => console.log(error))
    }, [movieId])
    
    // const onGoBack = () => {
    //     history.push(location?.state?.from?.location ?? '/movies');
    // }
    
    return (
        
        <div className={s.detailContainer} id='c'>
            
            <button type="button" className={s.button} onClick={()=>history.goBack()}>Go back</button>

            {movie && 
                <>
                <div className={s.about}>
                    <img className={s.poster} src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noPoster} alt={movie.title || movie.original_title} width={320} />
                <h2>{movie.title || movie.original_title} ({movie.release_date})</h2>
                <p>User Score: {movie.vote_average*10}%</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                    {movie.genres.length
                        ? movie.genres.map((el) => {
                    return <span key={el.id} className={s.genreItem}>{el.name }</span>
                        })
                        : <p>No genres</p>
                    }
                </div>
                
                <div className={s.info}>
                    <p className={s.infoTitle}>Additional information</p>
                    <ul className={s.nav}>
                        <li>
                            <NavLink to={`${url}/cast`} className={s.link} activeClassName={s.activeLink}>Cast</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${url}/reviews`} className={s.link} activeClassName={s.activeLink}>Reviews</NavLink>
                        </li>
                    </ul>
                </div>
                
                <Route path={`${path}/cast`}>
                    <Cast/>
                </Route>

                <Route path={`${path}/reviews`}>
                    <Reviews/>
                </Route>
                
                {/* <Route path={`/movies/:movieId/cast`}>
                        <Cast/>
                    </Route>
                    <Route path={`/movies/:movieId/reviews`} component={Reviews}/> */}
                </>
            }
        </div>
    )
}