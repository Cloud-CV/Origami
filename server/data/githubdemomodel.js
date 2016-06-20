import mongoose from 'mongoose';

const githubDemoSchema = mongoose.Schema({
  name:  String,
  id: {
    type: String,
    unique: true
  },
  description: String,
  timestamp: Number,
  token: String,
  dockercomposeFile: String,
  status: String
});

export default mongoose.model("githubDemo", githubDemoSchema);

