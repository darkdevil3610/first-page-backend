import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      unique: true,
    },
  ],
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 20,
  },
});

export default model('User', schema);
