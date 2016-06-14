import * as mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0/demo');
let db = mongoose.connection;
let Schema = mongoose.Schema;
export let model = mongoose.model;

export const inputComponentSchema = new Schema({
  id: Number,
  baseComponentId: Number,
  props: Array
});

export const outputComponentSchema = new Schema({
  id: Number,
  baseComponentId: Number,
  props: Array
});

export const githubDemoSchema = new Schema({
  name:  String,
  id: Number,
  description: String,
  timestamp: Number,
  token: String,
  dockerContainerId: String,
  inputComponentId: String,
  outputComponentId: String
});
