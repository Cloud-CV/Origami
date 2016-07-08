import mongoose from 'mongoose';

const nonghDemoSchema = mongoose.Schema({
  name:  String,
  id: {
    type: String,
    unique: true
  },
  address: String,
  description: String,
  terminal: Boolean,
  timestamp: Number,
  token: String,
  status: String
});

export default mongoose.model('nonghDemo', nonghDemoSchema);

