import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
        );

        setMovies((prev) => [...prev, ...res.data.results]);
        if (page >= res.data.total_pages) {
          setHasMore(false); 
        }
      } catch (err) {
        console.error("Erreur de fetch :", err);
      }
    };

    fetchPage();
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore, hasMore };
}
