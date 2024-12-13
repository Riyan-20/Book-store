// pages/api/authors.js
import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db('Book_store');
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Author ID is required' });
  }

  const author = await db.collection('authors').findOne({ id });
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.status(200).json(author);
}
