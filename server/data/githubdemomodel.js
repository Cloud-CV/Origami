import mongoose from "mongoose";

const githubDemoSchema = mongoose.Schema({
  name: String,
  id: {
    type: String,
    unique: true
  },
  userid: Number,
  description: String,
  terminal: Boolean,
  timestamp: Number,
  token: String,
  dockercomposeFile: String,
  status: String
});

export default mongoose.model("githubDemo", githubDemoSchema);
