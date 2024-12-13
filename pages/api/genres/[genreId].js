// pages/api/genres/[genreId].js
import { connectDB } from '../../lib/dbConnect';

export default async function handler(req, res) {
  const { genreId } = req.query;
  const client = await connectDB();
  const db = client.db('Book_store');

  const genre = await db.collection('genres').findOne({ id: genreId });
  if (!genre) {
    return res.status(404).json({ error: 'Genre not found' });
  }

  res.status(200).json(genre);
}
