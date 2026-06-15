/* eslint-disable import/extensions */
import { GraphQLError } from 'graphql';
import Image from '../../models/Image.js';

const findSingleImage = async (root, args) => {
  let image = null;

  try {
    image = await Image.findById(args.id);
  } catch (err) {
    throw new GraphQLError('Image not found, because id not valid', {
      extensions: {
        code: 'INVALID_IDENTIFIER',
        invalidArgs: args.id,
      },
    });
  }

  return image;
};

export default findSingleImage;
