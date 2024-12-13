// pages/api/books.js
import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db('Book_store');
  const { search } = req.query;

  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: 'i' } };
  }

  const books = await db.collection('books').find(query).toArray();
  res.status(200).json(books);
}
