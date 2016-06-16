import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let model = mongoose.model;

const githubDemoSchema = new Schema({
  name:  String,
  id: Number,
  description: String,
  timestamp: Number,
  token: String,
  dockercomposeFile: String,
  dockerContainerId: String
});

export default model("githubDemo", githubDemoSchema);
