import { Link } from 'react-router-dom';

function Movie({ movie, onLike }) {
  const baseUrl = "https://image.tmdb.org/t/p/w200";

  const handleLike = async () => {
    const id = movie.tmdb_id || movie.id;

    await fetch(`http://localhost:8000/api/movies/${id}/like`, {
      method: "POST",
    });

    if (onLike) onLike();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={baseUrl + movie.poster_path} alt={movie.title} width="100%" />
        <h3>{movie.title}</h3>
      </Link>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Likes : {movie.likes}</p>
      <button onClick={handleLike}>👍 Like</button>
    </div>
  );
}
export default Movie;
