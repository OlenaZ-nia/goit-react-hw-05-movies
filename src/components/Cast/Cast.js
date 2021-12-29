import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ApiMovieCast } from "../../api/themovideodb-api";


export const Cast = () => {
    const { movieId } = useParams();

    const [cast, setCast] = useState(null);

    useEffect(() => {
        ApiMovieCast(movieId).then(data => {
            console.log(data)
            setCast(data.cast);
        })
            .catch(error => console.log(error))
    }, [movieId])


    return (
        <>
            {cast && (
                <ul>
            {cast.map(({id, profile_path, name, original_name, character }) => (
                            <li key={id}>
                               <img src={`https://image.tmdb.org/t/p/w300/${profile_path}`} alt={name || original_name} width={75} />
                                <h3>{name || original_name}</h3>
                                <p>Character: {character }</p>
                            </li>
            ))}
        </ul>
        )}
        </>
    )

}