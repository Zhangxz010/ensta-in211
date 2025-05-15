import { useState } from 'react';
import { useFetchMovies } from "./useFetchMovies";
import Movie from "./Movie";
import logo from './logo.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState("");
  const [sort, setSort] = useState("likes");
  const [order, setOrder] = useState("desc");
  const [refresh, setRefresh] = useState(0);
  const { movies, loadMore, hasMore } = useFetchMovies(sort, order, refresh);

  const handleInputChange = (e) => {
    setMovieName(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  );

  const triggerRefresh = () => setRefresh(r => r + 1);

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

          {/* sorting */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <label>
              Trier par :
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="likes">Likes</option>
                <option value="title">Titre</option>
                <option value="year">Année</option>
              </select>
            </label>

            <label>
              Ordre :
              <select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="desc">Décroissant ↓</option>
                <option value="asc">Croissant ↑</option>
              </select>
            </label>
          </div>

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

        {hasMore && (
          <button className="load-more-button" onClick={loadMore}>
            Charger plus de films
          </button>
        )}
      </header>
    </div>
  );
}

export default Home;
