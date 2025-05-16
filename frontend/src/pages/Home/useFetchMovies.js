import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies(sort = "likes", order = "desc", refresh = 0) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [sort, order, refresh]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
        );

        const tmdbMovies = res.data.results || [];

        const localRes = await axios.get("http://localhost:8000/api/movies/likes");
        const likeMap = {};
        for (const entry of localRes.data) {
          likeMap[entry.tmdb_id] = entry.likes;
        }

        const merged = tmdbMovies.map((m) => ({
          ...m,
          likes: likeMap[m.id] || 0,
          title: m.title || "",
          release_date_obj: m.release_date ? new Date(m.release_date) : new Date(0),
        }));


        const sorted = [...merged].sort((a, b) => {
          let aVal = a[sort];
          let bVal = b[sort];

          if (sort === "year") {
            aVal = a.release_date_obj;
            bVal = b.release_date_obj;
          }

          if (typeof aVal === "string") aVal = aVal.toLowerCase();
          if (typeof bVal === "string") bVal = bVal.toLowerCase();

          if (aVal < bVal) return order === "asc" ? -1 : 1;
          if (aVal > bVal) return order === "asc" ? 1 : -1;
          return 0;
        });


        setMovies((prev) => [...prev, ...sorted]);

        if (page >= res.data.total_pages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    fetchPage();
  }, [page, sort, order, refresh]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore, hasMore };
}
