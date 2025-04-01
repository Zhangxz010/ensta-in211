function Movie({ movie }) {
    const baseUrl = "https://image.tmdb.org/t/p/w200";
  
    return (
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", width: "200px" }}>
        <img src={baseUrl + movie.poster_path} alt={movie.title} width="100%" />
        <h3>{movie.title}</h3>
        <p>Date de sortie : {movie.release_date}</p>
      </div>
    );
  }
  
  export default Movie;
  