import mongoose from "mongoose";

const outputComponentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  userid: Number,
  baseComponentId: Number,
  props: Array
});

export default mongoose.model("outputComponent", outputComponentSchema);
