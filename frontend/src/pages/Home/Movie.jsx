import { useState } from 'react';
import { Link } from 'react-router-dom';

function Movie({ movie, onLike }) {
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const [likes, setLikes] = useState(movie.likes || 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    const id = movie.tmdb_id || movie.id;
    setIsLiking(true);

    try {
      const res = await fetch(`http://localhost:8000/api/movies/${id}/like`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        if (onLike) onLike();
      } else {
        console.error("Échec du like");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    } finally {
      setIsLiking(false);
    }
  };


  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={baseUrl + movie.poster_path} alt={movie.title} width="100%" />
        <h3>{movie.title}</h3>
      </Link>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Likes : {likes}</p>
      <button onClick={handleLike} disabled={isLiking}>
        👍 {isLiking ? "Merci..." : "Like"}
      </button>
    </div>
  );
}

export default Movie;
