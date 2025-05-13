function Movie({ movie }) {
  const baseUrl = "https://image.tmdb.org/t/p/w200";

  const handleLike = async () => {
    await fetch(`http://localhost:8000/api/movies/${movie.id}/like`, {
      method: "POST",
    });
    window.location.reload();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
      <img src={baseUrl + movie.poster_path} alt={movie.title} width="100%" />
      <h3>{movie.title}</h3>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Likes : {movie.likes}</p>
      <button onClick={handleLike}>👍 Like</button>
    </div>
  );
}
export default Movie;