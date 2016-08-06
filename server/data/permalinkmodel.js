import mongoose from 'mongoose';

const permalinkSchema = mongoose.Schema({
  shortRelativeURL: String,
  fullRelativeURL: String,
  userId: String,
  projectId: String
});

export default mongoose.model('permalink', permalinkSchema);
