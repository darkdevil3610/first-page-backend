import { Schema, model } from 'mongoose';

const schema = new Schema({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
});

export default model('Brand', schema);
