import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import s from './Cast.module.css';
import { ApiMovieCast } from "../../api/themovideodb-api";
import noAvatar from '../../images/noAvatar.jpg';


export default function Cast ({movieId}) {
    // const { movieId } = useParams();

    const [cast, setCast] = useState([]);

    useEffect(() => {
        ApiMovieCast(movieId).then(data => {
            // const uniqueId = data.cast.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set()));
            // console.log(uniqueId);

            // if (data.cast.length === 0) {
            //     throw new Error('No cast');
            // }

            setCast([...mapper(data.cast)]);
            
            setTimeout(() => {
                document.querySelector('#cast').scrollIntoView({
                    behavior: 'smooth', block: 'nearest',
                });
            }, 1000);
        })
            .catch(error => console.log(error))
    }, [movieId])

    const mapper = (data) => {
        return data.map(({ cast_id, profile_path, name, original_name, character }) => (
            { cast_id, profile_path, name, original_name, character }
        ))
    }

    return (
        <>
            {cast.length > 0 ? (
                <ul className={s.actorList} id='cast'>
                    {cast.map(({ cast_id, profile_path, name, original_name, character }) => (
                <li key={cast_id} className={s.actorListItem}>
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
            )
    : <p id='cast'>No cast</p>}
        </>
    )

}

Cast.propTypes = {
   movieId: PropTypes.string.isRequired,
}