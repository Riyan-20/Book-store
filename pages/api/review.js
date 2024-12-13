// pages/api/reviews.js
import { connectDB } from '../lib/dbConnect';

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db('Book_store');
  const reviews = await db.collection('reviews').find({}).toArray();
  res.status(200).json(reviews);
}
