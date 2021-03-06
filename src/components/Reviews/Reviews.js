import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import s from './Reviews.module.css';
import { ApiMovieReview } from '../../api/themovideodb-api';


export default function Reviews ({movieId}) {
    // const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ApiMovieReview(movieId).then(data => {
            // console.log(data)
            setReviews(data.results);
            
            setTimeout(() => {
                document.querySelector('#reviews').scrollIntoView({
                    behavior: 'smooth', block: 'nearest',
                });
            }, 1000);
        
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
            ) : (<p id='reviews'>We don't have any reviews for this movie</p>)
            }
        </>
    )
}

Reviews.propTypes = {
   movieId: PropTypes.string.isRequired,
}