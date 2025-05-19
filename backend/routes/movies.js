import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';


const router = express.Router();
const movieRepository = appDataSource.getRepository(Movie);

router.post('/new', async (req, res) => {
  try {
    const { title, year } = req.body;

    const newMovie = movieRepository.create({ title, year });
    await movieRepository.save(newMovie);

    res.status(201).json({ message: 'Film enregistré !' });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du film :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/:id/like', async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await movieRepository.findOneBy({ tmdb_id: parseInt(id) });
    if (!movie) {
      return res.status(404).json({ error: "Film non trouvé (tmdb_id)" });
    }

    movie.likes += 1;
    await movieRepository.save(movie);

    res.status(200).json({ message: "Like ajouté", likes: movie.likes });
  } catch (err) {
    console.error("Erreur lors de l'ajout du like :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort || 'likes';
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';

    const page = parseInt(req.query.page || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    const movies = await movieRepository.find({
      order: { [sortBy]: order },
      skip: skip,
      take: limit,
    });

    res.json(movies);
  } catch (err) {
    console.error('Erreur lors de la récupération des films:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/likes', async (req, res) => {
  const movies = await movieRepository.find({ select: ["tmdb_id", "likes"] });
  res.json(movies);
});


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await movieRepository.delete(id);

    if (result.affected === 0) {
      return res.status(404).json({ message: `Aucun film trouvé avec l'id=${id}` });
    }

    res.status(200).json({ message: `Film avec id=${id} supprimé.` });
  } catch (err) {
    console.error('Erreur suppression film:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
