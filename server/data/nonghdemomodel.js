import mongoose from 'mongoose';

const nonghDemoSchema = mongoose.Schema({
  name:  String,
  id: {
    type: String,
    unique: true
  },
  description: String,
  timestamp: Number,
  token: String,
  status: String
});

export default mongoose.model("nonghDemo", nonghDemoSchema);

