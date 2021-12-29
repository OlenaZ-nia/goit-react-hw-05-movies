import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import s from './Cast.module.css';
import { ApiMovieCast } from "../../api/themovideodb-api";
import noAvatar from '../../images/noAvatar.jpg';


export const Cast = () => {
    const { movieId } = useParams();

    const [cast, setCast] = useState(null);

    useEffect(() => {
        ApiMovieCast(movieId).then(data => {
            console.log(data)
            setCast(data.cast);
            setTimeout(() => {
                document.querySelector('#cast').scrollIntoView({
                    behavior: 'smooth', block: 'nearest',
                });
            }, 1000);
        })
            .catch(error => console.log(error))
    }, [movieId])


    return (
        <>
            {cast && (
                <ul className={s.actorList} id='cast'>
            {cast.map(({id, profile_path, name, original_name, character }) => (
                <li key={id} className={s.actorListItem}>
                    <img className={s.avatar}
                        src={profile_path
                        ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                        : noAvatar}
                        alt={name || original_name} width={75} height={113} />
                    <h3>{name || original_name}</h3>
                    <p>Character: {character}</p>
                </li>
            ))}
        </ul>
        )}
        </>
    )

}