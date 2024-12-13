// models/Review.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  bookId: { type: String, ref: 'Book', required: true },
  userId: { type: String, ref: 'User', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
