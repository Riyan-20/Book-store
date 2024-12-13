// pages/api/allAuthors.js
import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db('Book_store');

  const authors = await db.collection('authors').find().toArray(); // Fetch all authors

  if (!authors || authors.length === 0) {
    return res.status(404).json({ error: 'No authors found' });
  }

  res.status(200).json(authors); // Return all authors
}
