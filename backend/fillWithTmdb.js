import axios from 'axios';
import { appDataSource } from './datasource.js';
import Movie from './entities/movies.js';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_TMDB_API_KEY;

async function main() {
  await appDataSource.initialize();
  console.log("Connected to database");

  const movieRepo = appDataSource.getRepository(Movie);
  let insertedCount = 0;

  for (let page = 1; page <= 5; page++) {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key:"522d421671cf75c2cba341597d86403a",
        language: "fr-FR",
        page,
      },
    });

    for (const m of res.data.results) {
      const existing = await movieRepo.findOneBy({ tmdb_id: m.id });
      if (existing) continue;

      const newMovie = movieRepo.create({
        tmdb_id: m.id,
        title: m.title,
        year: parseInt(m.release_date?.split('-')[0]) || 2000,
        likes: 0,
      });

      await movieRepo.save(newMovie);
      insertedCount++;
    }
  }

  console.log(`${insertedCount} films insérés.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Erreur :", err);
  process.exit(1);
});
