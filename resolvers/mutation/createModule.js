import { GraphQLError } from 'graphql';
import Module from '../../models/Module.js';

const createModule = async (root, { name, ...args }) => {
  const module = new Module({ name });
  try {
    await module.save();
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'USER_INPUT_ERROR',
        invalidArgs: args,
      },
    });
  }
  return module;
};

export default createModule;
