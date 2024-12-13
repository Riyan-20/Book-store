// pages/api/genres.js
import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db('Book_store');
  const genres = await db.collection('genres').find({}).toArray();
  res.status(200).json(genres);
}
