import mongoose from 'mongoose';

const inputComponentSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  baseComponentId: Number,
  props: Array
});

export default mongoose.model('inputComponent', inputComponentSchema);
