// Home.jsx
import { useState } from 'react';
import { useFetchMovies } from "./useFetchMovies";
import Movie from "./Movie";
import logo from './logo.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState("");
  const movies = useFetchMovies();

  const handleInputChange = (e) => {
    setMovieName(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="input-container">
          <input
            type="text"
            value={movieName}
            onChange={handleInputChange}
            placeholder="Entrez le nom du film"
            className="search-input"
          />
          <p>Nom du film : <strong>{movieName}</strong></p>
        </div>

        <div className="movies-grid">
          {filteredMovies.length === 0 ? (
            <p>Aucun résultat trouvé pour : <strong>{movieName}</strong></p>
          ) : (
            filteredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;
