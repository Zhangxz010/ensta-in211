import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`
                );
                setMovie(res.data);
            } catch (err) {
                console.error("Erreur TMDB :", err);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <p>Chargement...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: "12px", marginBottom: "1rem" }}
            />
            <p><strong>Année :</strong> {movie.release_date?.split("-")[0]}</p>
            <p><strong>Résumé :</strong> {movie.overview}</p>
            <p><strong>Durée :</strong> {movie.runtime} minutes</p>
            <p><strong>Langue originale :</strong> {movie.original_language}</p>
        </div>
    );
}

export default MovieDetail;
