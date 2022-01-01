import { Route, Switch, NavLink, useHistory, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import s from './MovieDetailsPage.module.css';
import Loader from "react-loader-spinner";
import { ApiMovieDetails } from '../../api/themovideodb-api';
import {selectData} from '../../helpers/selectData';
import noPoster from '../../images/noPoster.jpg';

const Cast = lazy(() => import('../../components/Cast/Cast.js' /* webpackChunkName: "cast"*/));
const Reviews = lazy(() => import('../../components/Reviews/Reviews.js' /* webpackChunkName: "reviews"*/));

export default function MovieDetailsPage () {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    const location = useLocation();
    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        document.querySelector('#c').scrollIntoView({
                    behavior: 'smooth',
                });
        ApiMovieDetails(movieId).then(data => {
            data.release_date = data.release_date.slice(0, 4);
            // data.release_date = data.release_date.substring(0, 4);

            setMovie(selectData(data));
    })
        .catch(error => console.log(error))
    }, [movieId])
    
    const onGoBack = () => {
        history.push(location?.state?.from?.location ?? '/movies');
    }
    
    return (
        
        <div className={s.detailContainer} id='c'>
            
            <button type="button" className={s.button} onClick={onGoBack}>Go back</button>

            {movie && 
                <>
                <div className={s.about}>
                    <img className={s.poster} src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noPoster} alt={movie.title || movie.original_title} width={320} height={480} />
                <h2>{movie.title || movie.original_title} {movie.release_date !=='' ? <span>({movie.release_date})</span> : ''}</h2>
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
                            <NavLink to={{ ...location, pathname: `${url}/cast` }} className={s.link} activeClassName={s.activeLink}>Cast</NavLink>
                        </li>
                        <li>
                            <NavLink to={{ ...location, pathname: `${url}/reviews` }} className={s.link} activeClassName={s.activeLink}>Reviews</NavLink>
                            
                        </li>
                    </ul>
                </div>
                
                <Suspense fallback={<div style={ {display: 'flex', height:'100vh', justifyContent: 'center', alignItems:'center'}}>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        timeout={3000}
                    /></div>}>
                    <Switch>
                        <Route path={`${path}/cast`}>
                            <Cast movieId={movieId} />
                        </Route>
                        <Route path={`${path}/reviews`}>
                            <Reviews movieId={movieId} />
                        </Route>
                    </Switch>
                </Suspense>
                
                </>
            }
        </div>
    )
}


