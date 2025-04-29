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

router.get('/', async (req, res) => {
    try {
      const movies = await movieRepository.find(); 
      res.json(movies);
    } catch (err) {
      console.error('Erreur lors de la récupération des films:', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
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
