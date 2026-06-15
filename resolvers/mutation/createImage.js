/* eslint-disable import/extensions */
import { GraphQLError } from 'graphql';
import Image from '../../models/Image.js';

const createImage = async (root, args) => {
  const image = new Image({ ...args });
  try {
    await image.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }
  return image;
};

export default createImage;
