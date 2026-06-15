/* eslint-disable import/extensions */
import { GraphQLError } from 'graphql';
import Text from '../../models/Text.js';

const createImage = async (root, args) => {
  const text = new Text({ ...args });
  try {
    await text.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }
  return text;
};

export default createImage;
