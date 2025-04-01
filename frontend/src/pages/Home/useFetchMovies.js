import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("Erreur de fetch :", err));
  }, []);

  return movies;
}
