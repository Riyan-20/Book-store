
// models/Author.js
import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  biography: { type: String, required: true },
});

export default mongoose.models.Author || mongoose.model('Author', AuthorSchema);
