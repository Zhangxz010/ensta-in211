import { useState } from 'react';
import './CommentForm.css';
import axios from 'axios';

function CommentForm({ tmdb_id, onCommentAdded }) {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !content) return;

        await axios.post("http://localhost:8000/api/comments", {
            tmdb_id: parseInt(tmdb_id),
            username,
            content,
            rating: parseInt(rating),
        });


        setUsername("");
        setContent("");
        if (onCommentAdded) onCommentAdded();
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <h3>Ajouter un commentaire</h3>
            <input
                type="text"
                placeholder="Votre nom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">Note</option>
                {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} ⭐</option>
                ))}
            </select>
            <textarea
                placeholder="Votre commentaire"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default CommentForm;



