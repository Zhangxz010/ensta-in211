import { useEffect, useState } from 'react';
import axios from 'axios';
import './CommentList.css';

function CommentList({ tmdb_id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/comments/${tmdb_id}`)
            .then((res) => setComments(res.data));
    }, [tmdb_id]);

    return (
        <div className="comment-list">
            <h3>Commentaires</h3>
            {comments.length === 0 ? (
                <p>Aucun commentaire pour ce film.</p>
            ) : (
                comments.map((c) => (
                    <div className="comment" key={c.id}>
                        <strong>{c.username}</strong> <em>({new Date(c.created_at).toLocaleString()})</em>
                        <p>{c.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default CommentList;