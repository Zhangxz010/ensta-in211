import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies(sort = "likes", order = "desc", refresh = 0) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchPage = async () => {
      try {
        // 1. 获取 TMDB 数据
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
        );

        const tmdbMovies = res.data.results || [];

        // 2. 获取本地 likes
        const localRes = await axios.get("http://localhost:8000/api/movies/likes");
        const localLikes = localRes.data || [];

        const likeMap = {};
        for (const m of localLikes) {
          likeMap[m.tmdb_id] = m.likes;
        }

        // 3. 合并 likes、补全 title 和 year
        const merged = tmdbMovies.map((m) => ({
          ...m,
          likes: likeMap[m.id] || 0,
          title: m.title || "",
          year: m.release_date ? parseInt(m.release_date.split("-")[0]) : 0,
        }));

        // 4. 稳定排序逻辑（兼容 string/number）
        const sorted = [...merged].sort((a, b) => {
          const aVal = typeof a[sort] === "string" ? a[sort].toLowerCase() : a[sort];
          const bVal = typeof b[sort] === "string" ? b[sort].toLowerCase() : b[sort];

          if (aVal < bVal) return order === "asc" ? -1 : 1;
          if (aVal > bVal) return order === "asc" ? 1 : -1;
          return 0;
        });

        setMovies((prev) => [...prev, ...sorted]);

        if (page >= res.data.total_pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Erreur de chargement des films :", error.message);
      }
    };

    fetchPage();
  }, [page, sort, order, refresh]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return { movies, loadMore, hasMore };
}
