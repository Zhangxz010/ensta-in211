console.log("Start running seed.js");
import 'dotenv/config'; 
import { appDataSource } from "../datasource.js";
import Movie from "../entities/movies.js";

const seedMovies = async () => {
  await appDataSource.initialize();
  console.log("Database connected");

  const repo = appDataSource.getRepository(Movie);

  const movies = [
    { title: "Inception", year: 2010 },
    { title: "The Matrix", year: 1999 }
  ];

  for (const m of movies) {
    const entity = repo.create(m);
    await repo.save(entity);
    console.log(`Inserted movie: ${m.title}`);
  }

  await appDataSource.destroy();
};

seedMovies()
  .then(() => console.log("Seeding done"))
  .catch((err) => console.error("Seeding error:", err));
