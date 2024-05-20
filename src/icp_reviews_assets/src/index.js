import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as icp_reviews_idl, canisterId as icp_reviews_id } from 'dfx-generated/icp_reviews';

const agent = new HttpAgent();
const icp_reviews = Actor.createActor(icp_reviews_idl, { agent, canisterId: icp_reviews_id });

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      const reviews = await icp_reviews.getReviews();
      setReviews(reviews);
    };
    loadReviews();
  }, []);

  const addReview = async () => {
    await icp_reviews.addReview(user, content, rating);
    const updatedReviews = await icp_reviews.getReviews();
    setReviews(updatedReviews);
  };

  return (
    <div>
      <h1>Reseñas</h1>
      <div>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenido"></textarea>
        <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} placeholder="Puntuación" />
        <button onClick={addReview}>Agregar Reseña</button>
      </div>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.user}</strong>: {review.content} ({review.rating}/5) - {new Date(Number(review.timestamp / 1000000n)).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
