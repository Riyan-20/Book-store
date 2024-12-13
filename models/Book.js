// models/Book.js
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  authorId: { type: String, ref: 'Author', required: true },
  genreId: { type: String, ref: 'Genre', required: true },
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
