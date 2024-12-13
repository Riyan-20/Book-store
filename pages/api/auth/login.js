// pages/api/auth/login.js
import jwt from 'jsonwebtoken';
import { connectDB } from '../../lib/dbConnect'; // Import your database connection utility

const JWT_SECRET = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b00c16b665a4db9b2a2c5abfd3ee5b4fa7a2c03313c50de5b4cc842'; // Hardcoded secret for JWT token

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // Connect to the database
    const client = await connectDB();
    const db = client.db(); // Get the database instance
    const usersCollection = db.collection('users'); // Access the 'users' collection
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    const { password: _, ...userData } = user;
    res.status(200).json({ token, user: userData });

  } catch (error) {
    console.error('Database connection error: ', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
