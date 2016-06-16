import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let model = mongoose.model;

const outputComponentSchema = new Schema({
  id: Number,
  baseComponentId: Number,
  props: Array
});

export default model("outputComponent", outputComponentSchema);
