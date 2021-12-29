import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ApiMovieReview } from '../../api/themovideodb-api';


export const Reviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ApiMovieReview(movieId).then(data => {
            console.log(data)
            setReviews(data.results);
        })
            .catch(error => console.log(error))
    }, [movieId])

    return (
        <>
            {reviews.length>0 ? (
                <ul>
            {reviews.map(({id, author, content }) => (
                            <li key={id}>
                                <h3>Author: {author}</h3>
                                <p>{content}</p>
                            </li>
            ))}
        </ul>
            ) : 
        (<p>We don't have any reviews for this movie</p>)
        }
        </>
    )
}