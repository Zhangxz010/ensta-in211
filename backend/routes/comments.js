import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comments.js';

const router = express.Router();
const repo = appDataSource.getRepository(Comment);

router.get('/:tmdb_id', async (req, res) => {
  const comments = await repo.find({
    where: { tmdb_id: parseInt(req.params.tmdb_id) },
    order: { created_at: 'DESC' },
  });
  res.json(comments);
});

router.post('/', async (req, res) => {
  const { tmdb_id, username, rating, content } = req.body;
  const comment = repo.create({ tmdb_id, username, rating, content });
  await repo.save(comment);
  res.status(201).json({ message: "Commentaire ajouté" });
});

export default router;
