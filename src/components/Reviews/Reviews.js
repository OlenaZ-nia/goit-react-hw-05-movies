import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import s from './Reviews.module.css';
import { ApiMovieReview } from '../../api/themovideodb-api';


export const Reviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ApiMovieReview(movieId).then(data => {
            console.log(data)
            setReviews(data.results);
            if (data.results.length > 0) {
                setTimeout(() => {
                document.querySelector('#reviews').scrollIntoView({
                    behavior: 'smooth', block: 'nearest',
                });
            }, 1000);
            }
        })
            .catch(error => console.log(error))
    }, [movieId])

    return (
        <>
            {reviews.length > 0
                ? (
                <ul className={s.reviewsList} id='reviews'>
            {reviews.map(({id, author, content }) => (
                <li key={id}>
                    <article>
                        <h3>Author: {author}</h3>
                        <p>{content}</p>
                    </article>
                </li>
            ))}
                </ul>
            ) : (<p>We don't have any reviews for this movie</p>)
            }
        </>
    )
}